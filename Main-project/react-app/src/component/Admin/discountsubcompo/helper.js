import { getoneproductsku } from "../../../context/Admin-context/apicallsadmin";

export const expirycheck = (date1, date2) => {
 if (date1 > new Date().toISOString()) {
  return "Scheduled";
 } else if (date2 < new Date().toISOString()) {
  return "Expired";
 } else {
  return "Active";
 }
};

export const addproductspecifics = async (allproducts) => {
 let products1 = [];
 let product = [];
 const data = await Promise.all(
  allproducts.map(async (e) => {
   const products = await getoneproductsku(e);
   products1.push({ productid: products[0] });
   product.push({ productid: products[0]._id });
  })
 );
 return { product, products1 };
};

export const specifichelper = (data, productid, discount = null) => {
 data.product = productid;
 data.appliesforall = false;
 data.discountvalue = `${data.discountvalue}%`;
 let startdate = new Date(data.startdate);
 data.startdate = startdate.toISOString();
 let enddate = new Date(data.enddate);
 data.enddate = enddate.toISOString();
 if (discount) {
  data._id = discount._id;
 } else {
  data.status = data.status !== null ? data.status : "enable";
 }

 return data;
};

export const forall = (data, discount = null) => {
 data.appliesforall = true;
 data.discountvalue = `${data.discountvalue}%`;
 if (discount) {
  data._id = discount._id;
  data.product = [];
 } else {
  data.status = data.status !== null ? data.status : "enable";
 }
 return data;
};
