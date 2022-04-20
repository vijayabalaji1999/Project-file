import { Navigate, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Usercontext } from "./Authcontext";
import { Loading } from "../../component/User/loading";
import { Notfound } from "../../component/User/Notfound";
import { getsessionApi } from "./apicalls";
import { Outlet, useLocation } from "react-router-dom";

export const Authenticateduser = ({ component: ReactComponent }) => {
 const navigate = useNavigate();
 const location = useLocation();
 const { values } = useContext(Usercontext);
 const { loading } = useContext(Usercontext);
 const { setlogged, setdata } = useContext(Usercontext);

 const getsession = async () => {
  const data = await getsessionApi();
  if (data.loggedIn === false) {
   navigate("/");
  }
 };

 useEffect(() => {
  getsession();
 }, [location]);

 if (loading) {
  return <Loading />;
 } else if (values && values.user.role === "user") {
  setlogged(true);
  return <ReactComponent />;
 } else if (values && values.user.role === "admin") {
  return <Notfound />;
 }
};
