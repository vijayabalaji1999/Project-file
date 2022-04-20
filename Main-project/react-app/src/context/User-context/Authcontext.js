import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Welcome } from "../../component/User/welcome";
// import { orderconfirmApi } from "../../context/User-context/discountcalculate";
import ReactDOMServer from "react-dom/server";
import { logoutsApi, welcome } from "./apicalls";
import {
 addtocartApi,
 deleteitemcartApi,
 getproductdetailApi,
 getsessionApi,
 loginAPI,
} from "./apicalls";
import { signupAPI } from "./apicalls";
import { collectionApi } from "./apicalls";
import { getcartApi } from "./apicalls";

export const Usercontext = React.createContext({
 values: [],
 login: () => {},
 signup: () => {},
 loading: undefined,
 setloading: undefined,
 getallproduct: () => {},
 logged: undefined,
 addtocart: () => {},
 logout: () => {},
 getallcart: () => {},
 deleteitemcart: () => {},
 setdata: undefined,
});

export const Authcontextprovider = (props) => {
 const [data, setdata] = useState();
 const [home, sethome] = useState(true);
 const [loading, setloading] = useState(true);
 const [logged, setlogged] = useState(true);
 const [error, seterror] = useState(false);
 const navigate = useNavigate();

 const loginDetials = async (email, password, message) => {
  const data = await loginAPI(email, password);
  if (!data.code) {
   console.log("data.code");
   setdata(data);
   if (data.user.role === "user") {
    navigate("/userdashboard");
    console.log("48");
    // setlogged(true);
    setloading(false);
   } else {
    navigate("/admindashboard");
    console.log("53");
    // setlogged(true);
    setloading(false);
   }
  }

  if (data.code) return data;
 };

 const logout = async () => {
  await logoutsApi();
  setdata(undefined);
 };

 const sendWelocme = async (email) => {
  const messageHtml = ReactDOMServer.renderToString(
   <Welcome name={email}></Welcome>
  );
  await welcome(messageHtml, email);
 };

 const signupDetials = async (email, password, passwordConfirm) => {
  // setloading(true);
  const data = await signupAPI(email, password, passwordConfirm);
  if (!data.code) {
   console.log("data.code");
   setdata(data);
   if (data.user.role === "user") {
    navigate("/userdashboard");
    console.log("82");
    // setlogged(true);
    setloading(false);
    await sendWelocme(data.user.email);
   } else {
    navigate("/admindashboard");
    console.log("88");
    // setlogged(true);
    setloading(false);
    await sendWelocme(data.admin.email);
   }
  }

  if (data.code) return data;
 };

 const getallproduct = async () => {
  const data = await collectionApi();
  if (!data.code) {
   console.log("101");
   //    setlogged(true);
  }

  if (data) return data;
 };

 const getsession = async () => {
  setloading(true);
  const data = await getsessionApi();
  // if (data) {

  if (!data.loggedIn) {
   setdata(undefined);
   setloading(false);
  }
  if (data.loggedIn) {
   console.log("data.loggedIn");
   setdata(data);
   setloading(false);
  }
 };

 useEffect(() => {
  getsession();
 }, []);

 const getproductdetail = async (id) => {
  // setloading(true);
  const data = await getproductdetailApi(id);
  if (!data.code) {
   console.log("133");
   //    setlogged(true);
  }
  // setloading(false);
  if (data) return data;
 };

 const addtocart = async (userid, productid, quantity, role) => {
  // setloading(true);
  const data = await addtocartApi(userid, productid, quantity, role);
  if (!data.code) {
   //    setlogged(true);
   console.log("145");
  }
  // setloading(false);
  if (data) return data;
 };

 const getallcart = async (userid) => {
  // setloading(true);
  const data = await getcartApi(userid);
  if (!data.code) {
   console.log("155");
   //    setlogged(true);
  }
  // setloading(false);
  if (data) return data;
 };

 const deleteitemcart = async (userid, productid) => {
  // setloading(true);
  const data = await deleteitemcartApi(userid, productid);
  if (!data.code) {
   console.log("166");
   //    setlogged(true);
  }
  // setloading(false);
  if (data) return data;
 };

 return (
  <Usercontext.Provider
   value={{
    values: data,
    login: loginDetials,
    signup: signupDetials,
    loading: loading,
    setlogged: setlogged,
    getallproduct: getallproduct,
    getproductdetail: getproductdetail,
    logged: logged,
    addtocart: addtocart,
    getallcart: getallcart,
    deleteitemcart: deleteitemcart,
    setdata: setdata,
    sethome: sethome,
    home: home,
    setloading: setloading,
    logout: logout,
   }}
  >
   {props.children}
  </Usercontext.Provider>
 );
};
