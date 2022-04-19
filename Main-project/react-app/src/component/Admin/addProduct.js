import { useState } from "react";
import { getimages } from "../../context/Admin-context/apicallsadmin";
import { useForm } from "react-hook-form";
import { addproduct } from "../../context/Admin-context/apicallsadmin";
import { Header } from "../User/header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router";

export const Addproduct = () => {
 const navigate = useNavigate();
 const toastid = React.useRef(null);
 const [image, setimage] = useState({});
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm();

 const uploadFileHandler = async (e) => {
  const file = e.target.files[0];
  const added = await getimages(file);
  setimage(added);
 };

 const submithandle = async (data) => {
  data.price = `$${data.price}`;
  data.images = image;
  data.status = data.status !== null ? data.status : "available";

  if (Object.keys(image).length === 0) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.info("Please add a product image", {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 500,
    });
   }
  } else {
   const added = await addproduct(data);
   if (added.status === "success") {
    if (!toast.isActive(toastid.current)) {
     toastid.current = toast.success("Product Added", {
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
  }
 };

 return (
  <>
   <Header />
   <ToastContainer />
   <div className="main-content">
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
          <h3>Add Product</h3>
          <button
           type="submit"
           form="updateform"
           className="button button--hollow justify-end inline-block"
          >
           Save
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
               placeholder=""
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
               placeholder=""
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
                placeholder=""
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
                placeholder=""
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
                 value="available"
                 defaultChecked={true}
                 {...register("status")}
                />{" "}
                Active
               </span>
               <span>
                <input
                 type="radio"
                 value="unavailable"
                 {...register("status")}
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
               {...register("description", {
                required: true,
               })}
              ></textarea>
              {errors.description && (
               <p className="error1">*Please enter the description</p>
              )}
             </div>
             <button
              type="submit"
              className="button button--hollow justify-end inline-block"
              form="updateform"
             >
              Save
             </button>
            </form>
           </div>
           <div className="product-imageitem">
            <div id="wrapper">
             <label htmlFor="description">Product Image</label>
             <div className="mt-10">
              <div className="tooltip">
               <span className="tooltiptext">
                {Object.keys(image).length !== 0 ? "Click image to remove" : ""}
               </span>
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
                 onClick={() => setimage({})}
                 className="drop-zone"
                />
               )}
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
   </div>
  </>
 );
};
