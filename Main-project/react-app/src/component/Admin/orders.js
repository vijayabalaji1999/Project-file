import { Header } from "../User/header";

import React, { useEffect, useState } from "react";
import { getallOrdersadmin } from "../../context/Admin-context/apicallsadmin";
import { Link } from "react-router-dom";
import { Loading } from "../User/loading";
import { Noproduct } from "../User/cartsubcomponenets/noproduct";

export const Orders = () => {
 const [noproduct, setnoproduct] = useState(false);
 const [orders, setorders] = useState({});
 const allorders = async () => {
  const products = await getallOrdersadmin();
  if (products.length === 0) {
   setnoproduct(true);
  }
  setorders(products);
 };

 const dateformat = (date) => {
  const dates = new Date(date);
  const month = dates.toLocaleString("default", { month: "short" });
  return `${month} ${dates.getDate()},${dates.getFullYear()}`;
 };

 useEffect(() => {
  allorders();
 }, []);
 return (
  <>
   <Header />
   {noproduct && <Noproduct message={"No Orders"} to={"admindashboard"} />}
   {Object.keys(orders).length === 0 && !noproduct && <Loading />}
   {Object.keys(orders).length !== 0 && !noproduct && (
    <div className="main-content">
     <section className="flex">
      <div className="container-fluid">
       <div className="admin-content">
        <div className="admin-left-nav mt-20">
         <ul>
          <li>
           <Link to="/admindashboard">Products</Link>
          </li>
          <li>
           <Link className="active" to="/adminorders">
            Orders
           </Link>
          </li>
          <li>
           <Link to="/admindiscount">Discount</Link>
          </li>
         </ul>
        </div>
        <div className="admin-right page-content">
         <div className="products-list">
          <div className="actions flex items-center">
           <h3>Orders</h3>
          </div>
          <div className="added-products">
           <table className="table">
            <thead>
             <tr>
              <th>S. No</th>
              <th>Order No.</th>
              <th>Date</th>
              <th>Payment Status</th>
              <th>Fulfillment Status</th>
              <th>Items</th>
              <th className="text-right">Total</th>
             </tr>
            </thead>
            <tbody>
             {orders.map((e, i) => {
              return (
               <tr key={e.orderno}>
                <td>
                 {i < 9 && "0"}
                 {i + 1}
                </td>
                <td>
                 <Link to={`/adminorderdetail/${e.orderno}`}>
                  <u>#{e.orderno}</u>
                 </Link>
                </td>
                <td>{dateformat(e.createdat)}</td>
                <td>{e.paymentstatus}</td>
                <td>UnFulfilled</td>
                <td>{e.totalquantity} items</td>
                <td className="text-right">
                 {" "}
                 $
                 {e.discountcode !== ""
                  ? Number(e.totalprice) - e.totaldiscount
                  : e.totalprice}
                </td>
               </tr>
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
