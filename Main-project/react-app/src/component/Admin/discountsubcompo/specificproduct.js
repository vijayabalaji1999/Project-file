import { Link } from "react-router-dom";

export const Specific = (props) => {
 return (
  <div id="show-modal" style={{ display: props.table ? "flex" : "none" }}>
   <div className="overlay"></div>

   <div className="admin-right page-content">
    <div className="products-list">
     <div className="actions flex items-center">
      <h3>Add products</h3>
     </div>
     <div className="added-products border-t">
      <div className="overflow-auto">
       <table className="table mt-20">
        <thead>
         <tr>
          <th>Select</th>
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Inventory</th>
         </tr>
        </thead>
        <tbody>
         {/*  */}
         {Object.keys(props.product).length !== 0 &&
          props.product.map((e) => {
           return (
            <tr key={e.sku}>
             <td>
              <input
               type="checkbox"
               name="prod-item"
               value={e.sku}
               onChange={(e) => {
                props.selected(e);
               }}
               checked={props.allproducts.indexOf(e.sku) !== -1 ? true : false}
              />
             </td>
             <td>
              <span className="admin-list-img">
               <img src={`/images/${e.images}`} alt="" />
              </span>
             </td>
             <td>
              <div className="">
               <Link to={`/adminproductdetail/${e._id}`}>
                <u>{e.name}</u>
               </Link>
              </div>
              <span>
               SKU: <span>{e.sku}</span>
              </span>
             </td>
             <td>{e.price}</td>
             <td>{e.inventory}</td>
            </tr>
           );
          })}
        </tbody>
       </table>
      </div>
     </div>
     <div className="mt-20">
      <button
       onClick={(e) => props.addproductspecific(props.allproducts)}
       className="button checkout_btn button--hollow"
      >
       Add Products
      </button>
      <button
       className="button update_btn"
       id="close-modal"
       type="submit"
       onClick={props.close}
      >
       Close
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
