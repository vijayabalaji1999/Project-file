import { useContext } from "react";
import { useNavigate } from "react-router";
import { Usercontext } from "../../context/User-context/Authcontext";

export const Notfound = () => {
 const navigate = useNavigate();
 const { values } = useContext(Usercontext);
 const { setlogged } = useContext(Usercontext);

 const goback = () => {
  if (values && values.user.role === "user") {
   navigate("/userdashboard");
  } else if (values && values.user.role === "admin") {
   navigate("/admindashboard");
  } else {
   setlogged(false);
   navigate("/");
  }
 };

 return (
  <section>
   <div className="form-container sign-up-container pagenot">
    <form className="pagenot">
     <h1>404 Page Not Found</h1>
     <button
      onClick={goback}
      className="button button--hollow justify-end inline-block"
     >
      Go Back
     </button>
    </form>
   </div>
  </section>
 );
};
