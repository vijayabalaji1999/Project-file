import { toast } from "react-toastify";
import { addtocartApi } from "../context/User-context/apicalls";
import { deleteitemcartApi } from "../context/User-context/apicalls";
import {
 decrement,
 incrementinventory,
} from "../context/User-context/apicalls";
const url = "http://localhost:3001/api/user";

const toastList = new Set();
const MAX_TOAST = 1;

export const setdiscount = async (userid, code) => {
 const updated = await fetch(`${url}/setdiscount`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   userid: userid,
   discountcode: code,
  }),
 });
 const data = await updated.json();
 return data;
};

export const getdiscount = async (code) => {
 const result = await fetch(`${url}/getdiscount`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   discountcode: code,
  }),
 });
 const data = await result.json();
 return data;
};

export const handleChangehelp = (qua, id, cart) => {
 let updatedproduct = cart.filter((e) => {
  if (e.productid._id === id) {
   e.quantity = Number(qua.target.value);
  }
  return true;
 });
 return updatedproduct;
};

export const checkouthandlercheck = async (products, userid) => {
 let code;
 let product = [];
 let status = [];
 const data = await Promise.all(
  products.map(async (e) => {
   const contents = await addtocartApi(
    userid,
    e.productid._id,
    e.quantity,
    "update"
   );
   if (contents.code) {
    code = contents.code;
    product.push(e.productid._id);
    status.push(e.productid.name);
   }
  })
 );

 if (code) {
  if (toastList.size < MAX_TOAST) {
   const id = toast.error(
    status.length === 1
     ? `${status[0]} Product is not-available`
     : "Some Products are not available right now",
    {
     position: toast.POSITION.TOP_CENTER,
     onClose: () => toastList.delete(id),
     autoClose: 1000,
    }
   );
   toastList.add(id);
  }
  const data1 = await Promise.all(
   product.map(async (e) => {
    const deletepro = await deleteitemcartApi(userid, e);
   })
  );

  return code;
 }
};

export const nodiscount = (products) => {
 let totalprice = 0;
 let quantity = 0;
 products.forEach((e) => {
  const amount = Number(e.productid.price.replace("$", ""));
  const price = e.quantity * amount;
  e.productid.fullprice = `$${price}`;
  totalprice += price;
  quantity += e.quantity;
  products.totalprice = totalprice;
  products.quantity = quantity;
 });
 return products;
};

export const ordercreate = (product, dis) => {
 const item = [];
 let total = 0;
 let quantity = 0;
 product.forEach((e) => {
  const obj = {};
  obj.productid = e.productid.sku;
  obj.productname = e.productid.name;
  obj.price = `$${Number(
   e.productid.discountprice
    ? e.productid.discountprice.replace("$", "")
    : e.productid.fullprice.replace("$", "")
  )}`;
  obj.discountvalue = e.productid.discountprice
   ? `${Number(dis.replace("%", ""))}%`
   : "";
  obj.actualprice = e.productid.price;

  obj.quantity = e.quantity;
  obj.images = e.productid.images;

  item.push(obj);
  total += Number(e.productid.fullprice.replace("$", ""));
  quantity += e.quantity;
 });

 return { item, total, quantity };
};

export const decrements = async (products) => {
 const datadecre = await Promise.all(
  products.map(async (e) => {
   const contents = await decrement(e.productid.sku, e.quantity);
  })
 );
};

export const incrementinventorys = async (products) => {
 const datadecre = await Promise.all(
  products.map(async (e) => {
   const contents = await incrementinventory(e.productid, e.quantity);
  })
 );
};
