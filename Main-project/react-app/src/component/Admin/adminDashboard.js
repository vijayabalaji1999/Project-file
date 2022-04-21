import { Header } from "../User/header";
import { getallproductadmin } from "../../context/Admin-context/apicallsadmin";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../User/loading";

export const Admindashboard = () => {
 const [product, setproduct] = useState({});

 const allproduct = async () => {
  const products = await getallproductadmin();
  setproduct(products);
 };

 useEffect(() => {
  allproduct();
 }, []);

 return (
  <>
   <Header />
   {Object.keys(product).length === 0 && <Loading />}
   {Object.keys(product).length !== 0 && (
    <div className="main-content">
     <section className="flex">
      <div className="container-fluid">
       <div className="admin-content">
        <div className="admin-left-nav mt-20">
         <ul>
          <li>
           <Link to="/admindashboard" className="active">
            Products
           </Link>
          </li>
          <li>
           <Link to="/adminorders">Orders</Link>
          </li>
          <li>
           <Link to="/admindiscount">Discount</Link>
          </li>
         </ul>
        </div>
        <div className="admin-right page-content">
         <div className="products-list">
          <div className="actions flex items-center">
           <h3>Products</h3>
           <Link
            to="/adminaddproduct"
            className="button button--hollow justify-end inline-block"
           >
            Add Product
           </Link>
          </div>
          <div className="added-products">
           <table className="table">
            <thead>
             <tr>
              <th>S. No</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Status</th>
             </tr>
            </thead>
            <tbody>
             {product.map((e, i) => {
              return (
               <React.Fragment key={e.sku}>
                <tr>
                 <td>
                  {i < 9 && "0"}
                  {i + 1}
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
                 </td>
                 <td>{e.sku}</td>
                 <td>{e.price}</td>
                 <td>{e.inventory}</td>
                 {e.status === "available" && (
                  <td className="color-green">Active</td>
                 )}
                 {e.status === "unavailable" && (
                  <td className="color-red">Inactive</td>
                 )}
                </tr>
               </React.Fragment>
              );
             })}
            </tbody>
           </table>
          </div>
         </div>
        </div>
       </div>
      </div>
     </section>
    </div>
   )}
  </>
 );
};
