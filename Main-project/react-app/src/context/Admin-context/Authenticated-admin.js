import React from "react";
import { Navigate, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { Usercontext } from "../User-context/Authcontext";
import { Loading } from "../../component/User/loading";
import { Notfound } from "../../component/User/Notfound";
import { getsessionApi } from "../User-context/apicalls";
import { useLocation } from "react-router-dom";

export const Authenticatedadmin = ({ component: ReactComponent }) => {
 const navigate = useNavigate();
 const { values } = useContext(Usercontext);
 const location = useLocation();
 const { loading, setlogged } = useContext(Usercontext);

 const getsession = async () => {
  const data = await getsessionApi();
  if (data.loggedIn === false || data.user.role === "user") {
   navigate("/");
  }
 };

 useEffect(() => {
  getsession();
 }, [location]);

 if (loading) {
  return <Loading />;
 } else if (values && values.user.role === "admin") {
  setlogged(true);
  return <ReactComponent />;
 } else if (values && values.user.role === "user") {
  return <Notfound />;
 }
};
