import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

export const Productcart = (props) => {
 return props.cart.map((e, i) => {
  return (
   <div className="line-items" key={btoa(e.productid.sku)}>
    <div className="line-item">
     <div className="line-item__left">
      <div className="line-item__image-wrapper">
       <img
        className="line-item__image"
        src={`/images/${e.productid.images}`}
        alt=""
       />
      </div>
     </div>
     <div className="line-item__right">
      <div className="line-item__details">
       <h2 className="line-item-title">
        <Link
         className="cart__product-title"
         to={`/userproductdetail/${e.productid.sku}`}
        >
         {e.productid.name}
        </Link>
       </h2>

       <p
        title="Remove item"
        className="line-item__remove deleteicon"
        onClick={() => props.deleteitem(props.userid, e.productid._id)}
       >
        <FaTrashAlt />
       </p>
      </div>

      <div className="line-item__price">
       <span>
        <strong>Price:</strong>
       </span>
       {e.productid.price}
      </div>

      <div className="line-item__total-amount-price">
       <span>
        <strong>Total Price:</strong>
       </span>
       {e.productid.fullprice}
      </div>

      <div className="line-item__quantity">
       <span className="line-item__quantity-text">Quantity:</span>
       <input
        type="number"
        className="number"
        name="updates[]"
        size="4"
        defaultValue={e.quantity}
        onChange={(evt) => props.handleChange(evt, e.productid._id, props.cart)}
       />
       <button
        className="button update_btn"
        type="submit"
        onClick={() => {
         props.singleupdate(props.userid, e.productid._id);
        }}
       >
        Update Quantity
       </button>
      </div>
     </div>
    </div>
   </div>
  );
 });
};
