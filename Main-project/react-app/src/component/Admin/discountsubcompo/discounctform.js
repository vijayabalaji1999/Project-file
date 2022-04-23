import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Addedproduct } from "./addedproduct";
import { Link } from "react-router-dom";
export const Discountform = (props) => {
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm();

 useEffect(() => {
  if (props.edit && Object.keys(props.discount).length !== 0) {
   setValue("discountcode", props.discount.discountcode);
   setValue("discountvalue", props.discount.discountvalue.replace("%", ""));
   setValue("status", props.discount.status ? props.discount.status : "enable");
   setValue("appliesforall", props.discount.appliesforall ? "all" : "specific");
   setValue("startdate", props.dateformattoback(props.discount.startdate));
   setValue("enddate", props.dateformattoback(props.discount.enddate));
   setValue("discountcode", props.discount.discountcode);
  }
 }, [props.discount]);
 return (
  <form onSubmit={handleSubmit(props.submithandle)}>
   <div className="form-inline">
    <div className="order__details-wrap">
     <div className="flex">
      <div className="w-50 pr-10">
       <h4>Discount code</h4>
       <input
        type="text"
        placeholder=""
        className=""
        {...register("discountcode", {
         required: true,
         validate: (value) => {
          return !!value.trim();
         },
        })}
       />
       {errors.discountcode && (
        <p className="error1">*Please enter the discountcode</p>
       )}
      </div>
      <div className="w-50 pl-10">
       <h4>Discount Value (in %)</h4>
       <input
        type="text"
        placeholder=""
        className=""
        {...register("discountvalue", {
         required: true,
         pattern: {
          value: /^[1-9]?\.?[0-9]?$|^100$/,
         },
        })}
       />
       {errors.discountvalue && (
        <p className="error1">*Please enter the discountvalue</p>
       )}
      </div>
     </div>
     <div className="mt-10">
      <h4>Status</h4>
      <div className="">
       <label htmlFor="enable">
        <input
         type="radio"
         className="input-text"
         id="enable"
         name="status"
         value="enable"
         {...register("status")}
         defaultChecked={true}
        />
        Enable
       </label>
      </div>
      <div className="mt-10">
       <label htmlFor="disable">
        <input
         type="radio"
         className="input-text"
         id="disable"
         name="status"
         value="disable"
         {...register("status")}
        />
        Disable
       </label>
      </div>
     </div>
    </div>
    <div className="order__details-wrap mt-20">
     <div className="">
      <h4>Applies to</h4>
      <div className="">
       <label htmlFor="all">
        <input
         type="radio"
         className="input-text"
         id="all"
         name="products"
         value="all"
         onClick={props.applies}
         defaultChecked={true}
         {...register("appliesforall")}
        />
        All Products
       </label>
      </div>
      <div className="mt-10">
       <label htmlFor="specific">
        <input
         type="radio"
         className="input-text"
         id="specific"
         name="products"
         value="specific"
         {...register("appliesforall")}
         onClick={props.specific}
         // onclick="javascript:showModal();"
        />
        Specific products
       </label>

       {props.active && Object.keys(props.selectedprod).length !== 0 ? (
        <table className="table">
         <Addedproduct
          selectedprod={props.selectedprod}
          removeproduct={props.removeproduct}
         />
        </table>
       ) : (
        ""
       )}
      </div>
     </div>
     <div className="mt-20 discount-period">
      <h4>Active Dates</h4>
      <div className="flex">
       <div className="w-50 pr-10">
        <label htmlFor="">Start Date</label>
        <input
         type="date"
         placeholder=""
         className=""
         {...register("startdate", {
          required: true,
         })}
        />
        {errors.startdate && (
         <p className="error1">*Please enter the startdate</p>
        )}
       </div>
       <div className="w-50 pl-10">
        <label htmlFor="">End Date</label>
        <input
         type="date"
         placeholder=""
         className=""
         {...register("enddate", {
          required: true,
         })}
        />
        {errors.enddate && <p className="error1">*Please enter the enddate</p>}
       </div>
      </div>
     </div>
    </div>
   </div>

   <div className="mt-20">
    <button type="submit" className="button checkout_btn button--hollow">
     Save
    </button>
    {!props.edit ? (
     <Link to="/admindiscount">
      <button className="button update_btn">Discard</button>
     </Link>
    ) : (
     <span className="class" onClick={(e) => props.deletediscount(props.id)}>
      Delete
     </span>
    )}
   </div>
  </form>
 );
};
