import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
import { useForm } from "react-hook-form";
import { getimages } from "../../context/Admin-context/apicallsadmin";
import { Header } from "../User/header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { productupdate } from "../../context/Admin-context/apicallsadmin";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useNavigate } from "react-router";

export const Editproduct = () => {
 const navigate = useNavigate();
 const [image, setimage] = useState({});
 const toastid = React.useRef(null);

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm();
 const [product, setproduct] = useState({});
 let { id } = useParams();

 const oneproduct = async (id) => {
  const products = await getoneproductadmin(id);
  if (!products) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.error("Product is unavailable", {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 500,
     onClose: () => navigate("/admindashboard"),
    });
   }
  }
  setproduct(products[0]);
  setimage(products[0].images);
 };

 useEffect(() => {
  oneproduct(id);
 }, []);

 const uploadFileHandler = async (e) => {
  const file = e.target.files[0];
  const added = await getimages(file);
  setimage(added);
 };
 const submithandle = async (data) => {
  let added;
  data.price = `$${data.price}`;
  data._id = product._id;

  if (Object.keys(image).length === 0) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.info("Please add a product image", {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 500,
    });
   }
  } else {
   data.images = image;
   added = await productupdate(data);
  }

  if (added.status === "success") {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.success("Product updated", {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 500,
     onClose: () => navigate("/admindashboard"),
    });
   }
  } else {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.error("SKU already exist", {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 500,
    });
   }
  }
 };

 return (
  <>
   <Header />
   <ToastContainer />
   <div className="main-content">
    {Object.keys(product).length !== 0 && (
     <section className="flex">
      <div className="container-fluid">
       <div className="admin-content">
        <div className="admin-left-nav mt-20">
         <ul>
          <li>
           <Link to="/admindashboard" className="active">
            Products
           </Link>
          </li>
          <li>
           <Link to="/adminorders">Orders</Link>
          </li>
          <li>
           <Link to="/admindiscount">Discount</Link>
          </li>
         </ul>
        </div>
        <div className="admin-right page-content">
         <div className="products-list">
          <div className="actions flex items-center">
           <h3>{product.name}</h3>
           <button
            href="admin-collection.html"
            form="updateform"
            className="button button--hollow justify-end inline-block"
           >
            Update
           </button>
          </div>
          <div className="edit-product">
           <div className="flex">
            <div className="product-lineitems form-section">
             <form id="updateform" onSubmit={handleSubmit(submithandle)}>
              <div className="form-control">
               <label htmlFor="product-name">Product Name</label>
               <input
                type="text"
                defaultValue={product.name}
                {...register("name", {
                 required: true,
                })}
               />
               {errors.name && <p className="error1">*Please enter the name</p>}
              </div>
              <div className="form-control">
               <label htmlFor="sku">SKU</label>
               <input
                type="text"
                defaultValue={product.sku}
                {...register("sku", {
                 required: true,
                })}
               />
               {errors.sku && <p className="error1">*Please enter the sku</p>}
              </div>
              <div className="flex">
               <div className="form-control pr-10">
                <label htmlFor="price">Price ($)</label>
                <input
                 type="text"
                 defaultValue={Number(product.price.replace("$", ""))}
                 {...register("price", {
                  required: true,
                  pattern: {
                   value: /^[0-9_.]+$/,
                  },
                 })}
                />
                {errors.price && (
                 <p className="error1">*Please enter the price</p>
                )}
               </div>
               <div className="form-control pl-10">
                <label htmlFor="inventory">Inventory</label>
                <input
                 type="text"
                 defaultValue={product.inventory}
                 {...register("inventory", {
                  required: true,
                  pattern: {
                   value: /^[0-9]+$/,
                  },
                 })}
                />
                {errors.inventory && (
                 <p className="error1">*Please enter the inventory</p>
                )}
               </div>
              </div>
              <div className="form-control">
               <label htmlFor="status">Product Status</label>
               <div className="mt-10">
                <span className="pr-20">
                 <input
                  type="radio"
                  defaultChecked={product.status === "available" ? true : false}
                  value="available"
                  {...register("status")}
                 />{" "}
                 Active
                </span>
                <span>
                 <input
                  type="radio"
                  defaultChecked={product.status === "available" ? false : true}
                  value="unavailable"
                  {...register("status")}
                  //{...register("inactive")}
                 />{" "}
                 Inactive
                </span>
               </div>
              </div>
              <div className="form-control">
               <label htmlFor="description">Description</label>
               <textarea
                cols="5"
                rows="10"
                defaultValue={product.description}
                {...register("description", {
                 required: true,
                })}
               />
               {errors.description && (
                <p className="error1">*Please enter the description</p>
               )}
              </div>
              <button
               form="updateform"
               className="button button--hollow justify-end inline-block"
               type="submit"
              >
               Update
              </button>
             </form>
            </div>
            <div className="product-imageitem">
             <div id="wrapper">
              <label htmlFor="description">Product Image</label>
              <div className="mt-10">
               <div className="tooltip">
                {Object.keys(image).length === 0 ? (
                 <label htmlFor="image-file" className="drop-zone">
                  <input
                   type="file"
                   id="image-file"
                   className="drop-zone__input"
                   onChange={uploadFileHandler}
                   required
                  />
                  Drop file here or click to upload
                 </label>
                ) : (
                 <img
                  src={`/images/${image}`}
                  alt="images"
                  className="drop-zone"
                 />
                )}
                <button
                 href="admin-collection.html"
                 className="button button--hollow justify-end inline-block btns"
                 onClick={() => setimage({})}
                >
                 Remove Image
                </button>
               </div>
              </div>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </section>
    )}
   </div>
  </>
 );
};
