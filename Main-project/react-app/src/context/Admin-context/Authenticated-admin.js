import React from "react";
import { Navigate } from "react-router";
import { useContext } from "react";
import { Usercontext } from "../User-context/Authcontext";
import { Loading } from "../../component/User/loading";
import { Notfound } from "../../component/User/Notfound";

export const Authenticatedadmin = ({ component: ReactComponent }) => {
 const { values } = useContext(Usercontext);
 const { loading } = useContext(Usercontext);

 if (loading) {
  return <Loading />;
 } else if (values && values.user.role === "admin") {
  return <ReactComponent />;
 } else if (values && values.user.role === "user") {
  return <Notfound />;
 } else {
  return <Navigate to="/" />;
 }
};
