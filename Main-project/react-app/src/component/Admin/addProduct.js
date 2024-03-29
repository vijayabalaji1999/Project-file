import { useState } from "react";
import { getimages } from "../../context/Admin-context/apicallsadmin";
import { useForm } from "react-hook-form";
import { addproduct } from "../../context/Admin-context/apicallsadmin";
import { Header } from "../User/header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router";
import { Productform } from "./productsubcomponent/productform";

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
  if (!e.target.files[0].type.startsWith("image")) {
   error("Please Upload a Valid Image");
   return;
  }
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
    error("SKU already exist");
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
   <Productform
    image={image}
    uploadFileHandler={uploadFileHandler}
    setimage={setimage}
    submithandle={submithandle}
    product={{}}
   />
  </>
 );
};
