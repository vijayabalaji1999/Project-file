import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getonediscountadmin } from "../../context/Admin-context/apicallsadmin";
import { Link } from "react-router-dom";
import { Specific } from "./discountsubcompo/specificproduct";
import { getallproductadmin } from "../../context/Admin-context/apicallsadmin";
import { useNavigate } from "react-router";
import { Header } from "../User/header";
import { editdiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { toast, ToastContainer } from "react-toastify";
import { addproductspecifics } from "./discountsubcompo/helper";
import { deletediscountApi } from "../../context/Admin-context/apicallsadmin";
import React from "react";
import { Discountform } from "./discountsubcompo/discounctform";
import { expirycheck } from "./discountsubcompo/helper";
import { specifichelper, forall } from "./discountsubcompo/helper";

export const Editdiscount = () => {
 const edit = true;
 const toastid = React.useRef(null);
 const [discount, setdiscount] = useState({});
 const [active, setactive] = useState(false);
 const [product, setproduct] = useState({});
 const [table, settable] = useState(false);
 const [selectedprod, setselectedprod] = useState({});
 const [allproducts, setallproducts] = useState([]);
 const [productid, setproductid] = useState({});

 const navigate = useNavigate();
 let { id } = useParams();

 const onediscount = async (id) => {
  const discount = await getonediscountadmin(id);
  setdiscount(discount[0]);

  if (!discount[0].appliesforall) {
   specificdefault();
   setselectedprod(discount[0].product);
   discount[0].product.map((e1) => {
    if (!allproducts.includes(e1.productid.sku)) {
     setallproducts((oldArray) => [...oldArray, e1.productid.sku]);
    }
   });
  }
 };

 const dateformat = (date) => {
  const dates = new Date(date);
  const month = dates.toLocaleString("default", { month: "short" });
  return `${month} ${dates.getDate()}`;
 };

 const dateformattoback = (date1) => {
  let dates;
  const date = new Date(date1);
  const month = date.getMonth() + 1;
  if (date.getDate() < 10) {
   dates = `${date.getFullYear()}-${
    date.getMonth() < 10 ? "0" : ""
   }${month}-0${date.getDate()}`;
  } else {
   dates = `${date.getFullYear()}-${
    date.getMonth() < 10 ? "0" : ""
   }${month}-${date.getDate()}`;
  }
  return dates;
 };
 useEffect(() => {
  onediscount(id);
 }, []);

 const submithandle = async (data) => {
  if (
   data.appliesforall === "specific" &&
   (productid.length === 0 || Object.keys(productid).length === 0)
  ) {
   error("Please select a specific product");
   return;
  }
  if (data.startdate < data.enddate) {
   let result;
   if (
    Object.keys(productid).length !== 0 &&
    data.appliesforall === "specific"
   ) {
    const data1 = specifichelper(data, productid, discount);
    result = await editdiscountadmin(data1);
   } else {
    const data1 = forall(data, discount);
    result = await editdiscountadmin(data);
   }

   if (result.discount) {
    if (!toast.isActive(toastid.current)) {
     toastid.current = toast.success("Discount Updated", {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => navigate("/admindiscount"),
     });
    }
   } else {
    error("Discount code already exist");
   }
  } else {
   error("End date should be greater than Start date");
  }
 };
 const error = (message) => {
  if (!toast.isActive(toastid.current)) {
   toastid.current = toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
   });
  }
 };
 const allproduct = async () => {
  const products = await getallproductadmin();
  setproduct(products);
 };

 const removeproduct = (sku) => {
  const products = allproducts.filter((e) => e !== sku.target.id);
  setallproducts(products);
  addproductspecific(products);
 };

 const deletediscount = async (code) => {
  if (window.confirm("Sure you want to delete the discount")) {
   const deleted = await deletediscountApi(code);
   if (deleted.deletedCount) {
    navigate("/admindiscount");
   }
  }
 };

 const selected = (e) => {
  const index = allproducts.indexOf(e.target.value);

  if (index === -1) {
   setallproducts((oldArray) => [...oldArray, e.target.value]);
  } else {
   setallproducts(allproducts.filter((sku) => sku !== e.target.value));
  }
 };

 const addproductspecific = async (allproducts) => {
  const data = await addproductspecifics(allproducts);
  setproductid(data.product);
  setselectedprod(data.products1);
 };

 useEffect(() => {
  allproduct();
 }, []);

 const specificdefault = () => {
  setactive(true);
 };

 const specific = () => {
  setactive(true);
  settable(true);
 };
 const applies = () => {
  setactive(false);
 };
 const close = () => {
  settable(false);
 };
 return (
  <>
   <Header />
   <ToastContainer />

   {Object.keys(discount).length !== 0 && (
    <div className="main-content">
     <section className="flex">
      <div className="container-fluid">
       <div className="admin-content">
        <div className="admin-left-nav mt-20">
         <ul>
          <li>
           {" "}
           <Link to="/admindashboard">Products</Link>
          </li>
          <li>
           <Link to="/adminorders">Orders</Link>
          </li>
          <li>
           <Link className="active" to="/admindiscount">
            Discount
           </Link>
          </li>
         </ul>
        </div>
        <div className="admin-right page-content">
         <div className="products-list">
          <div className="actions flex items-center">
           <h3>TRYNEW</h3>
          </div>
          <div className="view-orders">
           <div className="main-cart-wrapper">
            <div className="cart__items cart__block">
             <Discountform
              submithandle={submithandle}
              applies={applies}
              specific={specific}
              active={active}
              selectedprod={selectedprod}
              removeproduct={removeproduct}
              edit={edit}
              deletediscount={deletediscount}
              id={id}
              discount={discount}
              dateformattoback={dateformattoback}
             />
            </div>
            <div className="cart__details cart__block add-margin">
             <div className="order__details-wrap">
              <h3>Summary</h3>
              <div className="border-t mt-10">
               <div className="flex mt-20">
                <p>
                 <strong>Cart Offer</strong>
                </p>

                {expirycheck(discount.startdate, discount.enddate) ===
                 "Active" && <span className="color-green">Active</span>}
                {expirycheck(discount.startdate, discount.enddate) ===
                 "Expired" && <span className="color-red">Expired</span>}
                {expirycheck(discount.startdate, discount.enddate) ===
                 "Scheduled" && <span>Scheduled</span>}
               </div>
              </div>
              <ul className="list-items">
               <li>{discount.discountvalue} off products</li>
               <li>Active from {dateformat(discount.startdate)}</li>
              </ul>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </section>
     {Object.keys(product).length !== 0 && (
      <Specific
       table={table}
       product={product}
       selected={selected}
       allproducts={allproducts}
       addproductspecific={addproductspecific}
       close={close}
      />
     )}
    </div>
   )}
  </>
 );
};
