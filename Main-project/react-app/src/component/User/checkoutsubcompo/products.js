export const Checkoutproduct = (props) => {
 return props.cart.map((e) => {
  return (
   <tr className="product" key={btoa(e.productid.sku)}>
    <td className="product__image">
     <div className="product-thumbnail">
      <div className="product-thumbnail__wrapper">
       <img
        alt="Basic Green T-Shirt"
        className="product-thumbnail__image"
        src={`/images/${e.productid.images}`}
       />
      </div>
      <span className="product-thumbnail__quantity">{e.quantity}</span>
     </div>
    </td>
    <td className="product__description" scope="row">
     <span className="product__description__name discounts">
      {e.productid.name}
     </span>

     <span
      className={
       "product__description__variant " +
       (e.productid.discount ? "discountamount" : "")
      }
     >
      {e.productid.discount
       ? `Discount amount -${Number(e.productid.discount.replace("$", ""))}`
       : ""}
     </span>
    </td>
    <td className="product__quantity">
     <span className="visually-hidden">1</span>
    </td>
    <td className="product__price">
     <span className="order-summary__emphasis">
      {e.productid.discount ? (
       <del className="dele">{e.productid.fullprice}</del>
      ) : (
       e.productid.fullprice
      )}{" "}
     </span>
     <p className="order-summary__emphasis discountcut">
      {e.productid.discount ? e.productid.discountprice : ""}{" "}
     </p>
    </td>
   </tr>
  );
 });
};
