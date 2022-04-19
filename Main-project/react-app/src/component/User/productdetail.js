import { useParams } from "react-router";
import { Usercontext } from "../../context/User-context/Authcontext";
import { useContext, useState, useEffect } from "react";
import { useRef } from "react";
import { Header } from "./header";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { Loading } from "../../component/User/loading";
import { useNavigate } from "react-router";

export const Productdetail = () => {
 const navigate = useNavigate();
 const toastid = React.useRef(null);
 const [loading, setloading] = useState(false);
 const { values } = useContext(Usercontext);
 const { addtocart } = useContext(Usercontext);
 const userid = values.user._id;
 const { getproductdetail } = useContext(Usercontext);
 let { id } = useParams();
 const quantity = useRef();
 const [products, setproducts] = useState({});

 const getdetail = async (id) => {
  const productdetail = await getproductdetail(id);
  if (productdetail.productdetail.length === 0) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.error("Product is unavailable", {
     position: toast.POSITION.TOP_CENTER,
     onClose: () => navigate("/userdashboard"),
    });
   }
  } else {
   setproducts(productdetail.productdetail[0]);
  }
 };

 const handleclick = async () => {
  setloading(true);
  const data = await addtocart(
   userid,
   products._id,
   quantity.current.value,
   "add"
  );
  setloading(false);
  if (data.code) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.error(data.status, {
     position: toast.POSITION.TOP_CENTER,
    });
   }
  } else if (data) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.success("Product Added", {
     position: toast.POSITION.TOP_CENTER,
    });
   }
  }
 };

 useEffect(() => {
  getdetail(id);
 }, []);

 return (
  <>
   <Header />
   <ToastContainer />
   {Object.keys(products).length === 0 && <Loading />}
   {Object.keys(products).length !== 0 && (
    <div className="main-content">
     <section>
      <div className="container">
       <div className="product-template page-content">
        <h2>Product Details</h2>
        <div className="product-details row">
         <div className="product-wrap">
          <div className="product-single">
           <div className="product-media">
            {/* <a href="#"> */}
            <img
             src={`/images/${products.images}`}
             key={btoa(products.sku)}
             alt="hi"
            />
            {/* </a> */}
           </div>
           <div className="product-info">
            <div className="right-side">
             <span className="product-sku">SKU: {products.sku}</span>
             <h3 className="product-title main-title">{products.name}</h3>
             <div className="price">
              <div className="regular-price">
               <span>
                <span className="money" data-currency-usd="$200.00">
                 {products.price}
                </span>
               </span>
              </div>
             </div>
             {products.inventory > 0 ? (
              <div className="line-item-quantity">
               <span className="line-item__quantity-text">Quantity:</span>
               <input
                type="number"
                className="number"
                name=""
                size="4"
                id=""
                defaultValue="1"
                ref={quantity}
               />
              </div>
             ) : (
              ""
             )}
             <div className="product-add">
              {products.inventory > 0 ? (
               <button
                className="button button--alt"
                name="add"
                id="add"
                type="submit"
                onClick={handleclick}
                disabled={loading ? true : false}
               >
                {loading ? "Adding Product" : "Add to Bag"}
               </button>
              ) : (
               <p className="error-msg" name="add" id="add" disabled={true}>
                Out Of Stock
               </p>
              )}
             </div>
            </div>
           </div>
          </div>
          <div className="desc-wrap">
           <h4>Description</h4>
           <div className="detail-desc">
            <p>{products.description}</p>
            <p>
             <strong>Composition & Washing</strong>
            </p>
            <p>
             Jersey fabric: 100% cotton; woven fabric: 100% polyester, exclusive
             of embroideries. Wash by hand in water. Do not bleach. Iron at max.
             110 °C using a damp cloth between the iron and the fabric. Do not
             dry clean. Do not tumble dry. Flat drying in the shade.
            </p>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </section>
    </div>
   )}
  </>
 );
};
