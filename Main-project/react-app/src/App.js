import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Userroute } from "./routes/route";
import { Authcontextprovider } from "./context/User-context/Authcontext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./css/style.css";

export const stripePromise = loadStripe(
 "pk_test_51KWvTGSAEfEC9jrMrBRa2jJxrwVXhwLPf9YHUpnFHUNyUiav1tVD30QP7uafxSjbaVALmevrWi7XDMzQnFkHoqW100OuS12tXG"
);

function App() {
 useEffect(() => {}, []);
 return (
  <BrowserRouter>
   <Authcontextprovider>
    <Elements stripe={stripePromise}>
     <Userroute />
    </Elements>
   </Authcontextprovider>
  </BrowserRouter>
 );
}

export default App;
