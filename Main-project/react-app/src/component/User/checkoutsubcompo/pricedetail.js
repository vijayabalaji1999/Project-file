export const Pricedetail = (props) => {
 const cart = props.cart;
 return (
  <>
   <p className="no-margin evenly-align mt-20">
    <span className="cart-total-quantity">
     {cart.quantity ? cart.quantity : 0} items
    </span>
    <span className="cart-total-price">
     <span>${cart ? cart.totalprice : 0}</span>
    </span>
   </p>
   <div className="cart-subtotal evenly-align cart__total">
    <span className="cart-subtotal__title">Discount</span>
    <strong>
     <span className="cart-subtotal__price">
      {cart.discounttotal ? `$${cart.discounttotal}` : "$0"}
     </span>
    </strong>
   </div>
   <div className="gst1">
    <span colSpan="4">Shipping</span>
    <span className="text-rightgst1">$0</span>
   </div>
   <div className="gst2">
    <span colSpan="4" className="gst2">
     Tax(GST)
    </span>
    <span className="text-rightgst2">$0</span>
   </div>
   <div className="cart-subtotal evenly-align cart__total">
    <span className="cart-subtotal__title">Subtotal</span>
    <strong>
     <span className="cart-subtotal__price">
      ${cart.discounttotalprice ? cart.discounttotalprice : cart.totalprice}
     </span>
    </strong>
   </div>
   <div className="cart__total evenly-align separator">
    <span className="cart__total-text">Total:</span>
    <strong className="cart__total-price text-lg">
     <span>
      {" "}
      {cart.discounttotalprice ? cart.discounttotalprice : cart.totalprice}
     </span>
     <span> USD</span>
    </strong>
   </div>
  </>
 );
};
