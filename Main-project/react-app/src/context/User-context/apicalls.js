import { useEffect } from "react";
// import Axios from "axios";

const url = "http://localhost:3001/api/user";

export const loginAPI = async (email, password) => {
 const result = await fetch(`${url}/login`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   email: email,
   password: password,
   // message: message,
  }),
 });
 const data = await result.json();
 return data;
};

export const signupAPI = async (email, password, passwordConfirm) => {
 const result = await fetch(`${url}/signup`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   email: email,
   password: password,
   passwordConfirm: passwordConfirm,
  }),
 });

 const data = await result.json();
 return data;
};

export const collectionApi = async () => {
 // const cookies = getCookie("login");
 const result = await fetch(`${url}/getallproduct`, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
   // authorization: `Bearer ${cookies}`,
  },
 });
 const data = await result.json();
 return data;
};

export const getproductdetailApi = async (id) => {
 const result = await fetch(`${url}/productdetail`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   id: id,
  }),
 });
 const data = await result.json();
 return data;
};

export const addtocartApi = async (userid, productid, quantity, role) => {
 const result = await fetch(`${url}/addtocart`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   user: userid,
   productid: productid,
   quantity: quantity,
   role: role,
  }),
 });
 const data = await result.json();
 return data;
};

export const getcartApi = async (userid) => {
 const result = await fetch(`${url}/getcart`, {
  method: "POST",

  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   user: userid,
  }),
 });
 const data = await result.json();
 return data;
};

export const deleteitemcartApi = async (userid, productid) => {
 const result = await fetch(`${url}/deleteitemcart`, {
  method: "POST",
  // credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   user: userid,
   productid: productid,
  }),
 });
 const data = await result.json();
 return data;
};

export const stripesessionApi = async (lineitem, order) => {
 const result = await fetch(`${url}/checkout`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   lineitem,
   order,
  }),
 });
 const data = await result.json();
 return data;
};

// Axios.defaults.withCredentials = true;

export const getsessionApi = async () => {
 const result = await fetch("http://localhost:3001/user/sessions", {
  method: "GET",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
 });
 const data = await result.json();

 return data;
};

export const logoutsApi = async () => {
 const result = await fetch(`${url}/logout`, {
  method: "GET",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
 });
};
//

export const order = async (
 cart,
 contact,
 shipping,
 total,
 quantity,
 userid,
 discountotal,
 discount,
 orderid = null
) => {
 const result = await fetch(`${url}/addorder`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   user: userid,
   products: cart,
   totalprice: total,
   totalquantity: quantity,
   contact: contact,
   shipping: shipping,
   totaldiscount: discountotal,
   discountcode: discount,
   orderid: orderid,
  }),
 });
 const data = await result.json();
 return data.final;
};

export const orderdetail = async (orderid) => {
 const result = await fetch(`${url}/findorder`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   orderid: orderid,
  }),
 });
 const data = await result.json();
 return data;
};

export const allorders = async (userid) => {
 const result = await fetch(`${url}/myorders`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   userid: userid,
  }),
 });
 const data = await result.json();
 return data;
};

export const removeallcart = async (userid) => {
 const result = await fetch(`${url}/removecart`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   user: userid,
  }),
 });
 const data = await result.json();
 return data;
};

export const increment = async (code) => {
 const result = await fetch(`${url}/increment`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   code: code,
  }),
 });
 const data = await result.json();
 return data;
};

export const status = async (order) => {
 const result = await fetch(`${url}/status`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   order: order,
  }),
 });
 const data = await result.json();
 return data;
};

export const decrement = async (sku, quantity) => {
 const result = await fetch(`${url}/decrement`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   sku: sku,
   quantity: quantity,
  }),
 });
 const data = await result.json();
 return data;
};

export const orderconfirmApi = async (message, to) => {
 const result = await fetch(`${url}/sendingmail`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   message: message,
   to: to,
   subject: "Thanks for ordering",
  }),
 });
 return result;
};

export const welcome = async (message, to) => {
 const result = await fetch(`${url}/sendingmail`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   message: message,
   to: to,
   subject: "Welcome to Wigo family",
  }),
 });
};

export const incrementinventory = async (sku, quantity) => {
 const result = await fetch(`${url}/incrementinventory`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   sku: sku,
   quantity: quantity,
  }),
 });
 const data = await result.json();
 return data;
};
