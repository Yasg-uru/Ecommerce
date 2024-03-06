// import { useSelector } from "react-redux";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// function Requireauth({ allowedroles }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { isLoggedIn, role } = useSelector((state) => state.auth);
//   return isLoggedIn && allowedroles.find((roles) => roles === role) ? (
//     <Outlet />
//   ) : isLoggedIn ? (
//     navigate("/signup")
//   ) : (
//     navigate("/login")
//   );
// }
// export default Requireauth;
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Requireauth({ allowedroles }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const role=useSelector((state)=>state.auth.userdata.role)

  useEffect(() => {
    // Check the authentication state and navigate accordingly
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!allowedroles.includes(role)) {
    // } else if (!allowedroles.find((roles) => roles === role)) {
      navigate("/signup");
    }
    // If everything is fine, the child routes will be rendered via <Outlet />
  }, [isLoggedIn, role, allowedroles, navigate]);

  return <>{isLoggedIn && allowedroles.includes(role) && <Outlet />}</>;
  // return <>{isLoggedIn && allowedroles.find((roles) => roles === role) && <Outlet />}</>;
}

export default Requireauth;
