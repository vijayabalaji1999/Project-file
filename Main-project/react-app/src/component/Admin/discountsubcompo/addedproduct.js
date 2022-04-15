import { Link } from "react-router-dom";

export const Addedproduct = (props) => {
 return (
  <tbody>
   {Object.keys(props.selectedprod).length !== 0 &&
    props.selectedprod.map((e) => {
     return (
      <tr key={e.productid.sku}>
       <td>
        <span className="admin-list-img">
         <img src={`/images/${e.productid.images}`} alt="product-images" />
        </span>
       </td>
       <td>
        <div className="">
         <Link to={`/adminproductdetail/${e.productid._id}`}>
          <u>{e.productid.name}</u>
         </Link>
        </div>
       </td>
       <td className="text-right">
        <p href="#">
         <u
          id={e.productid.sku}
          className="removable"
          onClick={(e) => props.removeproduct(e)}
         >
          Remove
         </u>
        </p>
       </td>
      </tr>
     );
    })}
  </tbody>
 );
};
