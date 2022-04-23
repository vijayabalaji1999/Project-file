import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { orderdetail } from "../../../context/User-context/apicalls";

export const Checkoutdetails = (props) => {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
 } = useForm();

 const prefill = async (orderid) => {
  const data = await orderdetail(orderid);

  const object = {
   ...data.orderdetails[0].contact,
   ...data.orderdetails[0].shipping,
  };
  reset(object);
 };

 const checkouthandlers = (data) => {
  props.checkouthandler(data);
 };

 useEffect(() => {
  if (props.state) {
   prefill(props.orderid);
  }
 }, []);

 return (
  <form onSubmit={handleSubmit(checkouthandlers)}>
   <div className="fieldset">
    <h3>Contact information</h3>
    <div className="field-input">
     <label htmlFor="name">Name</label>
     <span>
      <input
       type="text"
       className="input-text"
       placeholder="Enter your name"
       {...register("name", {
        required: true,
        pattern: {
         value: /^[A-Za-z_ ]+$/,
        },
        validate: (value) => {
         return !!value.trim();
        },
       })}
      />
      {errors.name && <p className="error1">*Please enter the name</p>}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Email Id</label>
     <span>
      <input
       type="email"
       className="input-text"
       placeholder="Enter your email id"
       {...register("email", {
        required: true,
        pattern: {
         value: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        },
       })}
      />
      {errors.email && <p className="error1">*Please enter a valid email</p>}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Phone</label>
     <span>
      <input
       type="number"
       className="input-text tags"
       placeholder="Enter your phone no."
       onWheel={() => document.activeElement.blur()}
       {...register("phone", {
        required: true,
        pattern: {
         value: /^[0-9]+$/,
         message: "Please enter a number",
        },
        maxLength: 10,
        minLength: 10,
       })}
      />
      {errors.phone && <p className="error1">*Please enter the phone number</p>}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Address</label>
     <span>
      <input
       type="text"
       className="input-text"
       placeholder="Enter your address"
       {...register("address", {
        required: true,
        validate: (value) => {
         return !!value.trim();
        },
       })}
      />
      {errors.address && <p className="error1">*Please enter the address</p>}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Postal Code</label>
     <span>
      <input
       type="text"
       className="input-text"
       placeholder="Enter your postal code"
       onWheel={() => document.activeElement.blur()}
       {...register("postalcode", {
        required: true,
        pattern: {
         value: /^[0-9]+$/,
         message: "Please enter a number",
        },
       })}
      />
      {errors.postalcode && (
       <p className="error1">*Please enter the postalcode</p>
      )}
     </span>
    </div>
   </div>

   <div className="fieldset">
    <h3>Shipping Address</h3>

    <div className="field-input">
     <label htmlFor="name">Name</label>
     <span>
      <input
       type="text"
       className="input-text"
       placeholder="Enter your name"
       {...register("shippingname", {
        required: true,
        pattern: {
         value: /^[A-Za-z_ ]+$/,
        },
        validate: (value) => {
         return !!value.trim();
        },
       })}
      />
      {errors.shippingname && (
       <p className="error1">*Please enter the shipping-name</p>
      )}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Email Id</label>
     <span>
      <input
       type="email"
       className="input-text"
       placeholder="Enter your email id"
       {...register("shippingemail", {
        required: true,
        pattern: {
         value: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        },
       })}
      />
      {errors.shippingemail && (
       <p className="error1">*Please enter the valid shipping-email</p>
      )}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Phone</label>
     <span>
      <input
       type="number"
       className="input-text tags"
       placeholder="Enter your phone no."
       onWheel={() => document.activeElement.blur()}
       {...register("shippingphone", {
        required: true,

        pattern: {
         value: /^[0-9]+$/,
         message: "Please enter a number",
        },

        maxLength: 10,
        minLength: 10,
       })}
      />
      {errors.shippingphone && (
       <p className="error1">*Please enter the shipping-phone</p>
      )}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Address</label>
     <span>
      <input
       type="text"
       className="input-text"
       placeholder="Enter your address"
       {...register("shippingaddress", {
        required: true,
        validate: (value) => {
         return !!value.trim();
        },
       })}
      />
      {errors.shippingaddress && (
       <p className="error1">*Please enter the shipping-address</p>
      )}
     </span>
    </div>
    <div className="field-input">
     <label htmlFor="name">Postal Code</label>
     <span>
      <input
       type="text"
       className="input-text"
       placeholder="Enter your postal code"
       onWheel={() => document.activeElement.blur()}
       {...register("shippingpostal", {
        required: true,
        pattern: {
         value: /^[0-9]+$/,
         message: "Please enter a number",
        },
       })}
      />
      {errors.shippingpostal && (
       <p className="error1">*Please enter the shipping-postal</p>
      )}
     </span>
    </div>
   </div>
   <div className="action-btn">
    <button className="button button--hollow" type="submit">
     Proceed to Payment
    </button>
    <Link to="/usercart" className="button secondary-btn">
     Return to Cart
    </Link>
   </div>
  </form>
 );
};
