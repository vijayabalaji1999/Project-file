import { Loading } from "./loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { increment } from "../../context/User-context/apicalls";
import { decrement } from "../../context/User-context/apicalls";
import { status } from "../../context/User-context/apicalls";
import { removeallcart } from "../../context/User-context/apicalls";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { setdiscount } from "../../helpers/helper";
import { orderdetail } from "../../context/User-context/apicalls";
import { orderconfirmApi } from "../../context/User-context/apicalls";
import ReactDOMServer from "react-dom/server";
import { Reactcom } from "./email";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

export const Inventory = () => {
 let { orderid } = useParams();
 const { values } = useContext(Usercontext);
 const [load, setload] = useState(true);

 const removeall = async () => {
  const data = await removeallcart(values.user._id);
  const data1 = await setdiscount(values.user._id);
  const statusupdate = await status(orderid);
  const order = await orderdetail(orderid);

  const discount = order.orderdetails[0].discountcode;
  if (discount) {
   const increment1 = await increment(discount);
  }

  setload(false);

  const messageHtml = ReactDOMServer.renderToString(
   <Reactcom order={order.orderdetails[0]}></Reactcom>
  );
  const renders = await orderconfirmApi(
   messageHtml,
   order.orderdetails[0].shipping.shippingemail
  );
 };

 useEffect(() => {
  removeall();
 }, []);

 if (load) {
  return <Loading />;
 } else {
  return <Navigate to={`/userordersucess/${orderid}`} />;
 }
};
