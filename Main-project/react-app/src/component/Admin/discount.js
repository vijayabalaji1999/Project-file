import { Link } from "react-router-dom";
import { getalldiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { useState, useEffect } from "react";
import { Header } from "../User/header";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { Loading } from "../User/loading";

export const Discount = () => {
 const toastid = React.useRef(null);
 const [discount, setdiscount] = useState({});
 const [languages, setLanguages] = useState();
 const [check, setcheck] = useState(false);
 const [code, setcode] = useState();
 const navigate = useNavigate();
 const [num, setnum] = useState(false);

 const alldisocunts = async () => {
  const discounts = await getalldiscountadmin();
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

 const handleCheckboxChecked = (event, code, i) => {
  if (languages !== i) {
   setLanguages(i);
   setcheck(true);
   setcode(code);
   setnum(true);
  } else if (languages === i) {
   setLanguages(undefined);
   setcheck(false);
   setnum(false);
   setcode(undefined);
  }
 };

 const editdiscount = () => {
  if (code) {
   navigate(`/admindiscountedit/${code}`);
  } else {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.info("Please select a Discount", {
     position: toast.POSITION.TOP_CENTER,
    });
   }
  }
 };

 useEffect(() => {
  alldisocunts();
 }, []);

 return (
  <>
   <Header />
   <ToastContainer />
   {Object.keys(discount).length === 0 && <Loading />}
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
          <div className="actions flex items-center flex-start">
           <span>
            <span id="count">{num ? 1 : 0}</span> selected
           </span>
           <button onClick={editdiscount} className="white-btn items-center">
            Edit Discount
           </button>
          </div>
          <div className="added-products">
           <table className="table">
            <thead>
             <tr>
              <th>Select</th>
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
               <tr key={e.discountcode}>
                <td>
                 <input
                  type="checkbox"
                  // checked
                  name="discount-item"
                  onChange={(event) => handleCheckboxChecked(event, e._id, i)}
                  checked={check && languages === i ? true : false}
                 />
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
