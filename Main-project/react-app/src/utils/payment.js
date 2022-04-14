import { stripesessionApi } from "../context/User-context/apicalls";

export const payment = async (orderno, product, stripe) => {
 const item = [];
 product.forEach((e) => {
  const obj = {};
  obj.name = e.productid.name;
  obj.description = e.productid.description;
  obj.amount = Number(
   e.productid.discount
    ? parseFloat(
       (e.productid.discountprice.replace("$", "") * 100) / e.quantity
      ).toFixed(2)
    : parseFloat(
       (e.productid.fullprice.replace("$", "") * 100) / e.quantity
      ).toFixed(2)
  );
  obj.currency = "usd";
  obj.quantity = e.quantity;

  item.push(obj);

  console.log(item);
 });

 const session = await stripesessionApi(item, orderno);
 const sessionid = session.session.id;
 const { error } = await stripe.redirectToCheckout({
  sessionId: sessionid,
 });
 if (error) {
  console.log(error);
 }
};
