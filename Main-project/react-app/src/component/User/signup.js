import React, { useRef, useContext, useEffect, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { Header } from "./header";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { logoutsApi } from "../../context/User-context/apicalls";
import { getsessionApi } from "../../context/User-context/apicalls";
import { useNavigate } from "react-router";

export const Signup = () => {
 const navigate = useNavigate();
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm();
 const toastid = React.useRef(null);
 const { signup } = useContext(Usercontext);
 const { sethome } = useContext(Usercontext);
 const { setlogged, setloading, setdata } = useContext(Usercontext);

 const getsession = async () => {
  setloading(true);
  const data = await getsessionApi();

  if (!data.loggedIn) {
   setlogged(false);
   sethome(true);
  }
  if (data.loggedIn) {
   if (data.user.role === "user") {
    setdata(data);
    navigate("/userdashboard");
   }
   if (data.user.role === "admin") {
    setdata(data);
    navigate("/admindashboard");
   }
  }
  setloading(false);
 };

 useEffect(() => {
  getsession();
 }, []);

 const controller = async (datas) => {
  const data = await signup(datas.email, datas.password, datas.confirmpassword);

  if (data) {
   if (data.status === "Invalid input data.") {
    error("Password do not match");
   } else {
    error(data.status);
   }
  }
 };

 const error = (message) => {
  if (!toast.isActive(toastid.current)) {
   toastid.current = toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
   });
  }
 };

 return (
  <>
   <Header />
   <ToastContainer />
   <div className="main-content">
    <section>
     <div className="form-container sign-up-container">
      <form action="#" onSubmit={handleSubmit(controller)}>
       <h1>Create Account</h1>
       <div className="form-control">
        <label htmlFor="name">Email Address</label>
        <input
         type="email"
         placeholder=""
         {...register("email", {
          required: true,
          pattern: {
           value: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          },
         })}
        />
        {errors.email && (
         <p className="error1">*Please enter the valid Email-id</p>
        )}
       </div>
       <div className="form-control">
        <label htmlFor="name">Enter Password</label>
        <input
         type="password"
         {...register("password", {
          required: true,
          minLength: 6,
         })}
         placeholder=""
        />
        {errors.password && (
         <p className="error1">*Please enter the 6 digit password</p>
        )}
       </div>
       <div className="form-control">
        <label htmlFor="name">Confirm Password</label>
        <input
         type="password"
         {...register("confirmpassword", {
          required: true,
         })}
         placeholder=""
        />
        {errors.confirmpassword && (
         <p className="error1">*Please confirm your password</p>
        )}
       </div>
       <button className="button checkout_btn button--hollow">Sign Up</button>
      </form>
     </div>
    </section>
   </div>
  </>
 );
};
