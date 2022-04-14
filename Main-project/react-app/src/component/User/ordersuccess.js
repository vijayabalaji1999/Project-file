import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "./header";

export const Ordersucess = () => {
 let { orderid } = useParams();
 return (
  <>
   <Header />
   <div className="main-content">
    <section>
     <div className="container">
      <div className="checkout-template page-content">
       <h2>Thank you</h2>
       <div className="checkout-details row">
        <div className="checkout-wrap">
         <div className="checkout-section">
          <div className="contact-info">
           <div className="fieldset">
            <h3>Order Placed</h3>
            <p className="mt-20">Thank you for placing your order.</p>
            <p className="mt-20">
             Your order no.:
             <Link to={`/userorderdetail/${orderid}`}>
              {" "}
              <u>{orderid}</u>
             </Link>
             . You can check your order{" "}
             <Link to={`/userorderdetail/${orderid}`}>
              <u>details</u>
             </Link>{" "}
             here.
            </p>
           </div>

           <div className="action-btn">
            <Link to="/usermyorders" className="button button--hollow">
             My Orders
            </Link>
            <Link to="/userdashboard" className="button secondary-btn">
             Continue Shopping
            </Link>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>
   </div>
  </>
 );
};
