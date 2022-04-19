import { useContext, useState, useEffect } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { allorders } from "../../context/User-context/apicalls";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Loading } from "./loading";

export const Myorders = () => {
 const { values } = useContext(Usercontext);
 const [order, setorder] = useState({});

 const dateformat = (date) => {
  const date1 = new Date(date);
  const month = date1.toLocaleString("default", { month: "short" });
  return `${month} ${date1.getDate()},${date1.getFullYear()}`;
 };

 const allorder = async () => {
  const orders = await allorders(values.user._id);
  setorder(orders.allorders);
 };

 useEffect(() => {
  allorder();
 }, []);

 return (
  <>
   <Header />
   <div className="main-content">
    <section>
     {Object.keys(order).length === 0 && <Loading />}
     {Object.keys(order).length !== 0 && (
      <div className="container">
       <div className="checkout-template page-content">
        <h2>My Orders</h2>
        <div className="my-orders row">
         <div className="orders-wrap">
          <div className="orders-list">
           <table>
            <thead>
             <tr>
              <th>S. No</th>
              <th>Order No.</th>
              <th>Date</th>
              <th>Payment Status</th>
              <th>Fulfillment Status</th>
              <th className="text-right">Total</th>
             </tr>
            </thead>
            <tbody>
             {order.map((e, i) => {
              return (
               <tr key={btoa(e.orderno)}>
                <td>{i + 1}</td>
                <td>
                 <Link to={`/userorderdetail/${e.orderno}`}>
                  <u>#{e.orderno}</u>
                 </Link>
                </td>
                <td>{dateformat(e.createdat)}</td>
                <td>{e.paymentstatus}</td>
                <td>UnFulfilled</td>
                <td className="text-right">
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
     )}
    </section>
   </div>
  </>
 );
};
