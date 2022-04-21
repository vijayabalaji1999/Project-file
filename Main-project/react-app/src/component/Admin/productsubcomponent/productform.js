import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export const Productform = (props) => {
 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
 } = useForm();

 useEffect(() => {
  if (Object.keys(props.product).length !== 0) {
   props.product.price = Number(props.product.price.replace("$", ""));
   reset(props.product);
  }
 }, []);

 return (
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
         <h3>
          {Object.keys(props.product).length === 0
           ? "Add Product"
           : props.product.name}
         </h3>
         <button
          type="submit"
          form="updateform"
          className="button button--hollow justify-end inline-block"
         >
          {Object.keys(props.product).length === 0 ? "SAVE" : "UPDATE"}
         </button>
        </div>
        <div className="edit-product">
         <div className="flex">
          <div className="product-lineitems form-section">
           <form id="updateform" onSubmit={handleSubmit(props.submithandle)}>
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
             {Object.keys(props.product).length === 0 ? "SAVE" : "UPDATE"}
            </button>
           </form>
          </div>
          <div className="product-imageitem">
           <div id="wrapper">
            <label htmlFor="description">Product Image</label>
            <div className="mt-10">
             <div className="tooltip">
              {Object.keys(props.image).length === 0 ? (
               <label htmlFor="image-file" className="drop-zone">
                <input
                 type="file"
                 id="image-file"
                 className="drop-zone__input"
                 onChange={props.uploadFileHandler}
                 required
                />
                Drop file here or click to upload
               </label>
              ) : (
               <img
                src={`/images/${props.image}`}
                alt="images"
                className="drop-zone"
               />
              )}
              <button
               href="admin-collection.html"
               className="button button--hollow justify-end inline-block btns"
               onClick={() => props.setimage({})}
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
  </div>
 );
};
