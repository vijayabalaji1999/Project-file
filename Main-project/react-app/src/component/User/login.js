import React, { useContext, useEffect, useRef, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { Header } from "./header";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { loginAPI, logoutsApi } from "../../context/User-context/apicalls";
import { getsessionApi } from "../../context/User-context/apicalls";
import { useNavigate } from "react-router";

export const Login = () => {
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm();
 const navigate = useNavigate();
 const toastid = React.useRef(null);
 const { login, sethome } = useContext(Usercontext);
 const { setlogged, setdata } = useContext(Usercontext);
 const [loading, setloading] = useState(true);

 const getsession = async () => {
  setloading(true);
  const data = await getsessionApi();

  if (!data.loggedIn) {
   setlogged(false);
   sethome(false);
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
  const data = await login(datas.email, datas.password);
  if (data) {
   if (!toast.isActive(toastid.current)) {
    toastid.current = toast.error(data.status, {
     position: toast.POSITION.TOP_CENTER,
     autoClose: 1000,
    });
   }
  }
 };

 return (
  <>
   <Header />
   <ToastContainer />
   {!loading && (
    <section>
     <div className="form-container sign-up-container">
      <form action="#" onSubmit={handleSubmit(controller)}>
       <h1>Login</h1>
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
         <p className="error1">*Please enter the valid email id</p>
        )}
       </div>
       <div className="form-control">
        <label htmlFor="name">Enter Password</label>
        <input
         type="password"
         placeholder=""
         {...register("password", {
          required: true,
         })}
         // minLength: 10,
        />
        {errors.password && (
         <p className="error1">*Please enter the valid Password</p>
        )}
       </div>
       <button className="button button--hollow justify-end inline-block">
        Login
       </button>
      </form>
     </div>
    </section>
   )}
  </>
 );
};
