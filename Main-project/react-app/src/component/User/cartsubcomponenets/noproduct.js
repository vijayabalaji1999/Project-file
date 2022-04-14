import { Link } from "react-router-dom";

export const Noproduct = () => {
 return (
  <div className="cart-template page-content noproduct">
   <h1>NO PRODUCT AVAILABLE</h1>
   <Link to="/userdashboard">
    <button className="button button--alt collect">Go to collection</button>
   </Link>
   <div className="top"></div>
  </div>
 );
};
