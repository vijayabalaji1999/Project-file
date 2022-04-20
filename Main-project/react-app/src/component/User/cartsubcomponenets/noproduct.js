import { Link } from "react-router-dom";

export const Noproduct = (props) => {
 return (
  <div className="cart-template page-content noproduct">
   <h1>{props.message}</h1>
   <Link to={`/${props.to}`}>
    <button className="button button--alt collect">Go Back</button>
   </Link>
   <div className="top"></div>
  </div>
 );
};
