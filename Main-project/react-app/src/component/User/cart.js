import React, { useEffect, useContext, useState, useRef } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { discountcal } from "../../utils/discountcalculate";
import { handleChangehelp } from "../../helpers/helper";
import { setdiscount } from "../../helpers/helper";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Loading } from "../../component/User/loading";
import { toast, ToastContainer } from "react-toastify";
import { checkouthandlercheck } from "../../helpers/helper";
import { nodiscount } from "../../helpers/helper";
import { Productcart } from "./cartsubcomponenets/products";
import { Noproduct } from "./cartsubcomponenets/noproduct";

export const Cart = () => {
 const toastid = React.useRef(null);
 const { addtocart } = useContext(Usercontext);
 const { deleteitemcart } = useContext(Usercontext);
 const { getallcart } = useContext(Usercontext);
 const { values } = useContext(Usercontext);
 const [cart, setcart] = useState({});
 const [cartss, setcartss] = useState();
 const [coupon, setcoupon] = useState(false);
 const [noproduct, setnoproduct] = useState();
 const [updates, setupdates] = useState({});

 const userid = values.user._id;
 const promo = useRef();
 let updatedproduct;

 const getcart = async (userid) => {
  const allcart = await getallcart(userid);
  if (allcart.statusCode || allcart.productadded.length === 0) {
   setnoproduct(true);
   if (allcart.productadded.length === 0) {
    const data = await setdiscount(userid);
   }
   return;
  }

  setnoproduct(false);

  const discount = allcart.cartdetail[0].discount;
  const valid = await checking(allcart.productadded, userid);
  setcartss(allcart);

  if (discount === "") {
   const products = nodiscount(allcart.productadded);
   setcart(products);
   setcoupon(false);
  } else {
   const data = await discountcal(
    allcart.cartdetail[0].discount,
    allcart.cartdetail[0]
   );
   if (data.code && !data.error) {
    setcoupon(true);
   } else if (data.error) {
    setcoupon(false);
    error(data.error);
   }
   setcart(data);
  }
 };

 const error = (message) => {
  if (!toast.isActive(toastid.current)) {
   toastid.current = toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
   });
  }
 };

 const success = (message) => {
  if (!toast.isActive(toastid.current)) {
   toastid.current = toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500,
   });
  }
 };

 const handleChange = (qua, id, cart) => {
  updatedproduct = handleChangehelp(qua, id, cart);
  setupdates(updatedproduct);
 };

 const deletediscount = async () => {
  const data = await setdiscount(values.user._id);
  setcoupon(false);
  getcart(userid);
 };

 const singleupdate = async (userid, productid) => {
  let carts = Object.keys(updates).length !== 0 ? updates : cart;
  const finded = carts.filter((e) => {
   if (e.productid._id === productid) {
    return true;
   }
   return false;
  });
  const data = await addtocart(
   userid,
   finded[0].productid._id,
   finded[0].quantity,
   "update"
  );

  if (data.code) {
   error(data.status);
  } else {
   success("Product updated");
  }
  getcart(userid);
 };

 const updateallquantity = async () => {
  let carts = Object.keys(updates).length !== 0 ? updates : cart;
  let code;
  let status;

  const data = await Promise.all(
   carts.map(async (e) => {
    const contents = await addtocart(
     userid,
     e.productid._id,
     e.quantity,
     "update"
    );
    if (contents.code) {
     code = contents.code;
     status = contents.status;
    }
   })
  );

  if (code) {
   error(status);
  } else {
   success("Product updated");
  }
  getcart(userid);
  return data;
 };

 const deleteitem = async (userid, productid) => {
  const data = await deleteitemcart(userid, productid);
  if (Object.keys(updates).length !== 0) {
   setupdates(updates.filter((e) => e.productid._id !== productid));
  }
  getcart(userid);
 };

 const discounthandler = async () => {
  if (!promo.current.value) error("Please enter a Coupon");
  const data = await discountcal(promo.current.value, cartss.cartdetail[0]);
  if (data.error) {
   error(data.error);
  } else if (!data.error) {
   setcoupon(true);
   setcart(data);
  }
  getcart(userid);
 };

 const checking = async (product, userid) => {
  const result = await checkouthandlercheck(product, userid);
  if (result === 401) {
   getcart(userid);
  }
 };

 useEffect(() => {
  getcart(userid);
 }, []);

 return (
  <>
   <Header />
   <ToastContainer />
   <div className="main-content">
    {Object.keys(cart).length === 0 && !noproduct && <Loading />}
    {Object.keys(cart).length !== 0 && !noproduct && (
     <section>
      <div className="container">
       <div className="cart-template page-content">
        <h2>Cart</h2>
        <div className="cart-count-price">
         <p className="no-margin">
          <span className="cart-total-quantity">
           TOTAL: {cart.quantity} items
          </span>
          <strong className="cart-total-price">
           (
           <span>
            $
            {cart.discounttotalprice
             ? cart.discounttotalprice
             : cart.totalprice}
            <span id="revy-cart-subtotal-price"></span>
           </span>
           )
          </strong>
         </p>
        </div>
        <div className="main-cart-wrapper">
         <div className="cart__items cart__block">
          <Productcart
           cart={cart}
           deleteitem={deleteitem}
           handleChange={handleChange}
           singleupdate={singleupdate}
           userid={userid}
          />
         </div>
         <div className="cart__details cart__block">
          <div className="cart__details-wrap">
           <h5>ORDER SUMMARY</h5>
           <p className="no-margin evenly-align">
            <span className="cart-total-quantity">
             {cart.quantity ? cart.quantity : ""} items
            </span>
            <span className="cart-total-price">
             <span>${cart.totalprice} USD</span>
            </span>
           </p>
           {cart.discounttotalprice && (
            <div className="cart-subtotal evenly-align cart__total">
             <span className="cart-subtotal__title">Discount</span>
             <strong>
              <span className="cart-subtotal__price">
               ${cart.discounttotal}USD
              </span>
             </strong>
            </div>
           )}
           <div className="cart-subtotal evenly-align cart__total">
            <span className="cart-subtotal__title">Subtotal</span>

            <strong>
             <span className="cart-subtotal__price">
              $
              {cart.discounttotalprice
               ? cart.discounttotalprice
               : cart.totalprice}{" "}
              USD
             </span>
            </strong>
           </div>
           <div className="cart__total evenly-align">
            <span className="cart__total-text">Total:</span>
            <strong className="cart__total-price">
             <span>
              {" "}
              $
              {cart.discounttotalprice
               ? cart.discounttotalprice
               : cart.totalprice}
             </span>
             <span> USD</span>
            </strong>
           </div>
           <button
            className="button update_btn"
            type="submit"
            onClick={updateallquantity}
           >
            Update Quantity
           </button>
           <Link to="/usercheckout/0000">
            <button className="checkout button">Checkout</button>
           </Link>
           {coupon ? (
            <div className="cart-promo">
             <h5>COUPON APPLIED</h5>
             <h2>
              {cartss.cartdetail[0].discount
               ? cartss.cartdetail[0].discount
               : ""}
             </h2>
             <p className="promo" onClick={deletediscount}>
              REMOVE COUPON
             </p>
            </div>
           ) : (
            <div className="cart-promo">
             <h5>ENTER A PROMO CODE</h5>
             <input type="text" id="devPromo" ref={promo} />
             <p className="promo" onClick={discounthandler}>
              Apply Coupon
             </p>
            </div>
           )}

           <div className="text-center mt-20">
            <Link className="link-text-line" to="/userdashboard">
             Continue shopping
            </Link>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </section>
    )}
    {noproduct && (
     <Noproduct message={"No Products In Cart"} to={"userdashboard"} />
    )}
   </div>
  </>
 );
};
