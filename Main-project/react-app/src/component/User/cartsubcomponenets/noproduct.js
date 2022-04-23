import { Link } from "react-router-dom";

export const Noproduct = (props) => {
 return (
  <>
   {props.btn && (
    <>
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

      <div className="cart-template page-content noproduct nodiscount">
       <h1>{props.message}</h1>
       <Link to={`/${props.to}`}>
        <button className="button button--alt collect">
         {props.btn ? props.btn : "Go Back"}
        </button>
       </Link>
       <div className="top"></div>
      </div>
     </div>
    </>
   )}
   {!props.btn && (
    <div className="cart-template page-content noproduct">
     <h1>{props.message}</h1>
     <Link to={`/${props.to}`}>
      <button className="button button--alt collect">
       {props.btn ? props.btn : "Go Back"}
      </button>
     </Link>
     <div className="top"></div>
    </div>
   )}
  </>
 );
};
