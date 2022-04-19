import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getallproductadmin } from "../../context/Admin-context/apicallsadmin";
import { getoneproductsku } from "../../context/Admin-context/apicallsadmin";
import { adddiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { Header } from "../User/header";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { Specific } from "./discountsubcompo/specificproduct";
import { addproductspecifics } from "./discountsubcompo/helper";
import { Discountform } from "./discountsubcompo/discounctform";
import { specifichelper } from "./discountsubcompo/helper";
import { forall } from "./discountsubcompo/helper";
import { useNavigate } from "react-router";

export const Adddiscount = () => {
 const navigate = useNavigate();
 const edit = false;
 const toastid = React.useRef(null);
 const [active, setactive] = useState(false);
 const [product, setproduct] = useState({});
 const [table, settable] = useState(false);
 const [selectedprod, setselectedprod] = useState({});
 const [allproducts, setallproducts] = useState([]);
 const [productid, setproductid] = useState({});

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
   if (Object.keys(productid).length !== 0) {
    const data1 = specifichelper(data, productid);
    result = await adddiscountadmin(data);
   } else {
    const data1 = forall(data);
    result = await adddiscountadmin(data);
   }
   if (result.discount) {
    if (!toast.isActive(toastid.current)) {
     toastid.current = toast.success("Discount Added", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
      onClose: () => navigate("/admindiscount"),
     });
    }
   }
   if (result.code) {
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
    autoClose: 500,
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
            />
           </div>
           <div className="cart__details cart__block add-margin">
            <div className="order__details-wrap">
             <h3>Summary</h3>
             <div className="border-t mt-10">
              <div className="flex mt-20">
               <p>No information entered yet.</p>
              </div>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>
    <Specific
     table={table}
     product={product}
     selected={selected}
     allproducts={allproducts}
     addproductspecific={addproductspecific}
     close={close}
    />
   </div>
  </>
 );
};
