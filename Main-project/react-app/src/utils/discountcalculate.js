import { setdiscount } from "../helpers/helper";
import { getdiscount } from "../helpers/helper";
import { nodiscount } from "../helpers/helper";

const url = "http://localhost:3001/api/user";

export const discountcal = async (code, card, userid) => {
 const data = await getdiscount(code);

 if (data.code) {
  card.product.error = `Coupon "${code}" is Invalid/Expired`;
  const data1 = await setdiscount(card.user._id);

  const product = nodiscount(card.product);

  return product;
 }

 const discount = data.discount[0];
 const product = card.product;
 const value = parseInt(discount.discountvalue);
 const expired =
  discount.enddate >= new Date().toISOString() && discount.status === "enable";
 const scheduled = discount.startdate <= new Date().toISOString();
 if (!expired || !scheduled) {
  if (!expired) {
   card.product.error = "Card expired please try another coupon";
  } else {
   card.product.error = "Card is in scheduled please try again later";
  }

  const data = await setdiscount(card.user._id);

  const product = nodiscount(card.product);
  return product;
 }

 if (expired && discount.appliesforall) {
  let totalprice = 0;
  let discounttotalprice = 0;
  let discounttotal = 0;
  let quantity = 0;

  product.forEach((e) => {
   const prices = Number(e.productid.price.replace("$", ""));
   const price = e.quantity * prices;
   e.productid.fullprice = `$${price}`;
   e.productid.discountprice = `$${parseFloat(
    price - price * (value / 100)
   ).toFixed(2)}`;
   e.productid.discount = `$${parseFloat(price * (value / 100)).toFixed(2)}`;
   discounttotalprice += price - price * (value / 100);
   discounttotal += price * (value / 100);
   totalprice += price;
   quantity += e.quantity;
  });

  product.totalprice = totalprice;
  product.discounttotalprice = parseFloat(discounttotalprice).toFixed(2);
  product.discounttotal = parseFloat(discounttotal).toFixed(2);
  product.code = code;
  product.quantity = quantity;

  const data = await setdiscount(card.user._id, code);
  return product;
 } else if (expired && !discount.appliesforall) {
  let totalprice = 0;
  let discounttotalprice = 0;
  let discounttotal = 0;
  let quantity = 0;
  let coupon;

  const discountproduct = discount.product;

  let result = product.forEach((o1, i) => {
   // discountproduct.some((o2) => o1.productid._id === o2.productid._id)
   discountproduct.forEach((o2) => {
    if (o1.productid._id === o2.productid._id) {
     const prices = Number(o1.productid.price.replace("$", ""));
     const price = o1.quantity * prices;
     o1.productid.fullprice = `$${price}`;
     o1.productid.discountprice = `$${parseFloat(
      price - price * (value / 100)
     ).toFixed(2)}`;
     o1.productid.discount = `$${parseFloat(price * (value / 100)).toFixed(2)}`;
     const discountprices = Number(o1.productid.discountprice.replace("$", ""));
     const discount = Number(o1.productid.discount.replace("$", ""));

     discounttotalprice += discountprices;
     discounttotal += discount;
     coupon = true;
    }
   });

   const prices = Number(o1.productid.price.replace("$", ""));
   const price = o1.quantity * prices;
   o1.productid.fullprice = `$${price}`;
   totalprice += Number(o1.productid.price.replace("$", "") * o1.quantity);
   quantity += o1.quantity;
   product.quantity = quantity;
   product.totalprice = totalprice;
   product.discounttotalprice = parseFloat(totalprice - discounttotal).toFixed(
    2
   );
   product.discounttotal = discounttotal;
   product.code = code;
  });

  if (!coupon) {
   card.product.error =
    "No product are valid for this coupon please try  another coupon";
   const data = await setdiscount(userid);
   return card.product;
  }

  const data = await setdiscount(card.user._id, code);

  return product;
 }
};
