import { useState, useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { discountcal } from "../../utils/discountcalculate";
import { order } from "../../context/User-context/apicalls";
import { nodiscount } from "../../helpers/helper";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { getdiscount } from "../../helpers/helper";
import { setdiscount } from "../../helpers/helper";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "../../component/User/loading";
import { Header } from "./header";
import { ordercreate } from "../../helpers/helper";
import { payment } from "../../utils/payment";
import React from "react";
import { Checkoutproduct } from "./checkoutsubcompo/products";
import { Pricedetail } from "./checkoutsubcompo/pricedetail";
import { Checkoutdetails } from "./checkoutsubcompo/checkoutcontact";
import { decrements } from "../../helpers/helper";
import { useNavigate } from "react-router";

export const Checkout = () => {
 const navigate = useNavigate();
 const toastid = React.useRef(null);
 const { addtocart } = useContext(Usercontext);
 const { values } = useContext(Usercontext);
 const userid = values.user._id;
 const [cart, setcart] = useState({});
 const [dis, setdis] = useState();
 const { getallcart } = useContext(Usercontext);
 const [cartss, setcartss] = useState();
 const [state, setstate] = useState(false);

 const stripe = useStripe();
 let { orderid } = useParams();

 let status;
 let code;

 const checkouthandler = async (data1 = null) => {
  let all = await getallcart(userid);
  let products = all.productadded;
  let contents;

  let product = [];
  const data = await Promise.all(
   products.map(async (e) => {
    contents = await addtocart(userid, e.productid._id, e.quantity);
    if (contents.code) {
     code = contents.code;
     status = e.productid.name;
     product.push(e.productid._id);
    }
   })
  );
  if (code) {
   error(
    `Can't buy this ${status} in this quantity please try another quantity`
   );
  }
  const run = await maindata(data1);
 };

 const maindata = async (data1) => {
  if (orderid !== "0000") {
   setstate(true);
  }

  const allcart = await getallcart(userid);
  const discount = allcart.cartdetail[0].discount;
  if (allcart.productadded.length === 0) {
   const data = await setdiscount(values.user._id);
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.error("No Products in Cart", {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 500,
     onClose: () => navigate("/usercart"),
    });
   }
   return console.log("discount deleted redirect here");
  }

  if (discount !== "") {
   const data1 = await getdiscount(allcart.cartdetail[0].discount);
   if (data1.code) {
    error("Coupon is expired Please try another or continue with this amount");
   } else {
    setdis(data1.discount[0].discountvalue);
   }
  }

  setcartss(allcart);

  if (discount === "") {
   const products = nodiscount(allcart.productadded);
   setcart(products);
   if (data1 !== null) contact(data1, allcart.productadded);
  } else {
   const data = await discountcal(
    allcart.cartdetail[0].discount,
    allcart.cartdetail[0]
   );
   if (data.code && !data.error) {
    setcart(data);
    if (data1 !== null) contact(data1, data);
   } else if (data.error) {
    error("Coupon is expired Please try another or continue with this amount");
   }
  }
 };

 useEffect(() => {
  checkouthandler();
 }, []);

 const contact = async (data, product) => {
  let shippingobj = {};
  let contactobj = {};
  let result1 = [];
  let discount;
  let totaldiscount = 0;
  let result = Object.keys(data).filter((e) => {
   if (e.includes("shipping")) {
    return true;
   } else {
    result1.push(e);
   }
  });
  result.forEach((e) => {
   if (data[e]) {
    shippingobj[e] = data[e];
   }
  });
  result1.forEach((e) => {
   if (data[e]) {
    contactobj[e] = data[e];
   }
  });
  const { item, total, quantity } = ordercreate(product, dis);

  totaldiscount = cartss.cartdetail[0].product.discounttotal;
  discount = cartss.cartdetail[0].discount ? cartss.cartdetail[0].discount : "";

  const data2 = await order(
   item,
   contactobj,
   shippingobj,
   total,
   quantity,
   userid,
   totaldiscount,
   discount,
   orderid
  );

  if (code) {
   error(
    `Can't buy this ${status} in this quantity please try another quantity`
   );
  } else if (data2 && !code) {
   await decrements(product);
   payment(data2, product, stripe);
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

 return (
  <>
   <Header />
   <ToastContainer />
   <div className="main-content">
    <section>
     {Object.keys(cart).length === 0 && <Loading />}
     {Object.keys(cart).length !== 0 && (
      <div className="container">
       <div className="checkout-template page-content">
        <h2>Checkout</h2>
        <div className="checkout-details row">
         <div className="checkout-wrap">
          <div className="checkout-section">
           <div className="contact-info">
            <Checkoutdetails
             checkouthandler={checkouthandler}
             state={state}
             orderid={orderid}
            />
           </div>

           <div className="order-summary-right">
            <div className="order-summary__sections">
             <div className="">
              <div className="order-summary__section__content">
               <table className="product-table">
                <thead className="product-table__header">
                 <tr>
                  <th>
                   <span className="visually-hidden">Image</span>
                  </th>
                  <th>
                   <span className="visually-hidden">Description</span>
                  </th>
                  <th>
                   <span className="visually-hidden">Quantity</span>
                  </th>
                  <th>
                   <span className="visually-hidden">Price</span>
                  </th>
                 </tr>
                </thead>
                <tbody>
                 <Checkoutproduct cart={cart} />
                </tbody>
               </table>
              </div>
              <Pricedetail cart={cart} />
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     )}
    </section>
   </div>
  </>
 );
};
