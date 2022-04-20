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
import { Productedit } from "./productsubcomponent/producteditform";

export const Editproduct = () => {
 const navigate = useNavigate();
 const [image, setimage] = useState({});
 const toastid = React.useRef(null);

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
   {Object.keys(product).length !== 0 && (
    <Productedit
     image={image}
     uploadFileHandler={uploadFileHandler}
     setimage={setimage}
     submithandle={submithandle}
     product={product}
    />
   )}
  </>
 );
};
