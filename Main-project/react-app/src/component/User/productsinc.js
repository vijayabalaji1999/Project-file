import { Loading } from "./loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { orderdetail } from "../../context/User-context/apicalls";
import { incrementinventorys } from "../../helpers/helper";

import { Navigate } from "react-router";

export const Productinc = () => {
 let { orderid } = useParams();
 const { values } = useContext(Usercontext);
 const [load, setload] = useState(true);

 const removeall = async () => {
  const order = await orderdetail(orderid);
  await incrementinventorys(order.orderdetails[0].products);
  setload(false);
 };
 useEffect(() => {
  removeall();
 }, []);

 if (load) {
  return <Loading />;
 } else {
  return <Navigate to={`/usercheckout/${orderid}`} />;
 }
};
