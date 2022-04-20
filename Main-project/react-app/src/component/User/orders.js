import { useContext, useState, useEffect } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { allorders } from "../../context/User-context/apicalls";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Loading } from "./loading";
import { Noproduct } from "./cartsubcomponenets/noproduct";

export const Myorders = () => {
 const [noproduct, setnoproduct] = useState(false);
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
  console.log(orders.allorders.length === 0);
  if (orders.allorders.length === 0) {
   setnoproduct(true);
  }
 };

 useEffect(() => {
  allorder();
 }, []);

 return (
  <>
   <Header />
   {noproduct && <Noproduct message={"No Orders"} to={"userdashboard"} />}
   <div className="main-content">
    <section>
     {Object.keys(order).length === 0 && !noproduct && <Loading />}
     {Object.keys(order).length !== 0 && !noproduct && (
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
