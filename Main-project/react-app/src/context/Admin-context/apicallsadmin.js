import axios from "axios";

const url = "http://localhost:3001/api/admin";

export const getallproductadmin = async () => {
 const result = await fetch(`${url}/getallproductsadmin`, {
  method: "GET",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
 });
 const data = await result.json();
 return data.products;
};

export const getoneproductadmin = async (sku) => {
 const result = await fetch(`${url}/getoneproductadmin`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   sku: sku,
  }),
 });
 const data = await result.json();
 return data.product;
};

export const getoneproductsku = async (sku) => {
 const result = await fetch(`${url}/getoneproductsku`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   sku: sku,
  }),
 });
 const data = await result.json();
 return data.product;
};

export const addproduct = async (product) => {
 const result = await fetch(`${url}/addproduct`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   data: product,
  }),
 });
 const data = await result.json();
 return data;
};

export const getimages = async (file1) => {
 let formData1 = new FormData();

 formData1.append("images", file1);
 // // formData.append("File", file);

 const result = await axios.post(`${url}/editproduct`, formData1, {
  headers: {
   "Content-Type": "multipart/form-data",
  },
 });

 return result.data.file;
};

export const productupdate = async (data1) => {
 const result = await fetch(`${url}/updateproduct`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   data: data1,
  }),
 });
 const data = await result.json();
 return data;
};

export const getalldiscountadmin = async () => {
 const result = await fetch(`${url}/getalldiscount`, {
  method: "GET",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
 });
 const data = await result.json();
 return data.discounts;
};

export const adddiscountadmin = async (data1) => {
 const result = await fetch(`${url}/addDiscount`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   data: data1,
  }),
 });
 const data = await result.json();
 return data;
};

export const getonediscountadmin = async (code) => {
 const result = await fetch(`${url}/getonediscount`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   code: code,
  }),
 });
 const data = await result.json();
 return data.discount;
};

export const editdiscountadmin = async (data1) => {
 const result = await fetch(`${url}/editdiscount`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   data: data1,
  }),
 });
 const data = await result.json();
 return data;
};

export const getallOrdersadmin = async () => {
 const result = await fetch(`${url}/getallorders`, {
  method: "GET",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
 });
 const data = await result.json();
 return data.orders;
};

export const getorderdetail = async (orderid) => {
 const result = await fetch(`${url}/getorderdetail`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   orderid: orderid,
  }),
 });
 const data = await result.json();
 return data.orders;
};

export const numberoforders = async (userid) => {
 const result = await fetch(`${url}/numberoforders`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   userid: userid,
  }),
 });

 const data = await result.json();
 return data.number;
};

//

export const deletediscountApi = async (code) => {
 const result = await fetch(`${url}/deletediscount`, {
  method: "POST",
  credentials: "include",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   id: code,
  }),
 });

 const data = await result.json();
 return data.deleted;
};
