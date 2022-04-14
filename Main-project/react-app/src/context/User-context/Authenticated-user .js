import { Navigate } from "react-router";
import { useContext } from "react";
import { Usercontext } from "./Authcontext";
import { Loading } from "../../component/User/loading";
import { Notfound } from "../../component/User/Notfound";

export const Authenticateduser = ({ component: ReactComponent }) => {
 const { values } = useContext(Usercontext);
 const { loading } = useContext(Usercontext);
 const { setlogged } = useContext(Usercontext);

 if (loading) {
  return <Loading />;
 } else if (values && values.user.role === "user") {
  return <ReactComponent />;
 } else if (values && values.user.role === "admin") {
  return <Notfound />;
 } else {
  setlogged(false);
  return <Navigate to="/" />;
 }
};
