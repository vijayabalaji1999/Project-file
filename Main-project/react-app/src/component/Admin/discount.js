import { Link } from "react-router-dom";
import { getalldiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { useState, useEffect } from "react";
import { Header } from "../User/header";
import React from "react";
import { Loading } from "../User/loading";
import { Noproduct } from "../User/cartsubcomponenets/noproduct";

export const Discount = () => {
 const [discount, setdiscount] = useState({});
 const [nodiscount, setnodiscount] = useState(false);

 const alldisocunts = async () => {
  const discounts = await getalldiscountadmin();
  if (discounts.length === 0) {
   setnodiscount(true);
  }
  setdiscount(discounts);
 };

 const dateformat = (date) => {
  const date1 = new Date(date);
  const month = date1.toLocaleString("default", { month: "short" });
  return `${month} ${date1.getDate()},${date1.getFullYear()}`;
 };

 const expirycheck = (date1, date2) => {
  if (date1 > new Date().toISOString()) {
   return "Scheduled";
  } else if (date2 < new Date().toISOString()) {
   return "Expired";
  } else {
   return "Active";
  }
 };

 useEffect(() => {
  alldisocunts();
 }, []);

 return (
  <>
   <Header />
   {Object.keys(discount).length === 0 && !nodiscount && <Loading />}
   {nodiscount && (
    <Noproduct
     message={"No Discount"}
     to={"adminadddiscount"}
     btn={"Create a Discount"}
    />
   )}
   {Object.keys(discount).length !== 0 && (
    <div className="main-content">
     <section className="flex">
      <div className="container-fluid">
       <div className="admin-content">
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
        </div>
        <div className="admin-right page-content">
         <div className="products-list">
          <div className="actions flex items-center">
           <h3>Discounts</h3>
           <Link
            to="/adminadddiscount"
            className="button button--hollow justify-end inline-block"
           >
            Create Discount
           </Link>
          </div>
          <div className="added-products">
           <table className="table">
            <thead>
             <tr>
              <th>S. No</th>
              <th>Discount Code</th>
              <th>Times Used</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
             </tr>
            </thead>
            <tbody>
             {discount.map((e, i) => {
              return (
               <tr
                className={e.status === "enable" ? "" : "disable"}
                key={e.discountcode}
               >
                <td>
                 {i < 9 && "0"}
                 {i + 1}
                </td>
                <td>
                 <Link to={`/admindiscountedit/${e._id}`}>
                  <u>{e.discountcode}</u>
                 </Link>
                 <p>{e.discountvalue} off one-time purchase products</p>
                </td>
                <td>
                 <span>{e.timeused}</span> used
                </td>
                <td>{dateformat(e.startdate)}</td>
                <td>{dateformat(e.enddate)}</td>
                {expirycheck(e.startdate, e.enddate) === "Active" && (
                 <td className="color-green">Active</td>
                )}
                {expirycheck(e.startdate, e.enddate) === "Expired" && (
                 <td className="color-red">Expired</td>
                )}
                {expirycheck(e.startdate, e.enddate) === "Scheduled" && (
                 <td>Scheduled</td>
                )}
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
