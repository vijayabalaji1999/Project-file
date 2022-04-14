import React from "react";
import { Login } from "../component/User/login";
import { Authenticateduser } from "../context/User-context/Authenticated-user ";
import { Routes, Route } from "react-router";
import { Signup } from "../component/User/signup";
import { Collection } from "../component/User/collection";
import { Productdetail } from "../component/User/productdetail";
import { Cart } from "../component/User/cart";
import { Checkout } from "../component/User/checkout";
import { Ordersucess } from "../component/User/ordersuccess";
import { Orderdetail } from "../component/User/orderdetail";
import { Myorders } from "../component/User/orders";
import { Welcome } from "../component/User/welcome";
import { Inventory } from "../component/User/inventory";
import { FieldArray } from "../component/User/check";
import { Authenticatedadmin } from "../context/Admin-context/Authenticated-admin";
import { Addproduct } from "../component/Admin/addProduct";
import { Admindashboard } from "../component/Admin/adminDashboard";
import { Editproduct } from "../component/Admin/editproduct";
import { Discount } from "../component/Admin/discount";
import { Adddiscount } from "../component/Admin/adddiscount";
import { Editdiscount } from "../component/Admin/editdiscount";
import { Orders } from "../component/Admin/orders";
import { Notfound } from "../component/User/Notfound";
import { Productinc } from "../component/User/productsinc";

export const Userroute = () => {
 return (
  <>
   <Routes>
    <Route path="/" element={<Login />} exact />
    <Route path="/signup" element={<Signup />} exact />
    <Route
     path="/userdashboard"
     element={<Authenticateduser component={Collection} />}
    />
    <Route
     path="/userproductdetail/:id"
     element={<Authenticateduser component={Productdetail} />}
    />
    <Route path="/usercart" element={<Authenticateduser component={Cart} />} />
    <Route
     path="/usercheckout/:orderid"
     element={<Authenticateduser component={Checkout} />}
    />
    <Route
     path="/inventoryreduce/:orderid"
     element={<Authenticateduser component={Inventory} />}
    />
    <Route
     path="/userordersucess/:orderid"
     element={<Authenticateduser component={Ordersucess} />}
    />
    <Route
     path="/userorderdetail/:orderid"
     element={<Authenticateduser component={Orderdetail} />}
    />
    <Route
     path="/usermyorders"
     element={<Authenticateduser component={Myorders} />}
    />
    <Route
     path="/usertest"
     element={<Authenticateduser component={Welcome} />}
    />
    <Route
     path="/productinc/:orderid"
     element={<Authenticateduser component={Productinc} />}
    />
    <Route
     path="/admindashboard"
     element={<Authenticatedadmin component={Admindashboard} />}
     exact
    />
    <Route
     path="/addproduct"
     element={<Authenticatedadmin component={Addproduct} />}
    />
    <Route
     path="/adminproductdetail/:id"
     element={<Authenticatedadmin component={Editproduct} />}
    />
    <Route
     path="/adminaddproduct"
     element={<Authenticatedadmin component={Addproduct} />}
    />
    <Route
     path="/admindiscount"
     element={<Authenticatedadmin component={Discount} />}
    />
    <Route
     path="/adminadddiscount"
     element={<Authenticatedadmin component={Adddiscount} />}
    />

    <Route
     path="/admindiscountedit/:id"
     element={<Authenticatedadmin component={Editdiscount} />}
    />

    <Route
     path="/adminorders"
     element={<Authenticatedadmin component={Orders} />}
    />
    <Route
     path="/adminorderdetail/:orderid"
     element={<Authenticatedadmin component={Orderdetail} />}
    />
    <Route path="*" element={<Notfound />} exact />
    <Route path="/notfound" element={<Notfound />} exact />
   </Routes>
  </>
 );
};
