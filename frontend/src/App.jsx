import { Routes, Route } from "react-router-dom";
import Signup from "./components/authentications/Signup.jsx";
import Navbar from "./components/stable/Navbar.jsx";
import LoginForm from "./components/authentications/Login.jsx";
import Homepage from "./components/productcomponents/Homepage.jsx";
import Result from "./components/productcomponents/Result.jsx";
import Detailspage from "./components/productcomponents/Detailspage.jsx";
import Createproduct from "./Admin access/Createproduct.jsx";
import Getcarts from "./components/productcomponents/Getcarts.jsx";
import Rating from "./components/productcomponents/Rating.jsx";
import CheckOut from "./components/productcomponents/CheckOut.jsx";
import CreateVender from "./vender components/CreateVender.jsx";
import UpdateVender from "./vender components/UpdateVender.jsx";
import Getvender from "./vender components/Getvender.jsx";
import Myorder from "./components/productcomponents/Myorder.jsx";
import Footer from "./components/stable/Footer.jsx";
import Getvenders from "./vender components/Getvenders.jsx";
import Venderconsole from "./vender components/Venderconsole.jsx";
import Products from "./vender components/Nestedcomponent/Products.jsx";
import Orders from "./vender components/Nestedcomponent/Orders.jsx";
import Sales from "./vender components/Nestedcomponent/Sales.jsx";
import Updateproduct from "./Admin access/Updateproduct.jsx";
import Adminpage from "./Admin access/Adminpage.jsx";
import Adminproducts from "./Admin access/Adminproducts.jsx";
import Forgotpassword from "./components/authentications/Forgotpassword.jsx";
import Resetpassword from "./components/authentications/Resetpassword.jsx";
import Getalluser from "./components/authentications/Getalluser.jsx";
import Accessdenied from "./components/authentications/Accessdenied.jsx";
import Requireauth from "./components/authentications/Requireauth.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpass" element={<Resetpassword />} />
        <Route element={<Requireauth allowedroles={["admin"]} />}>
          <Route path="/getvenders" element={<Getvenders />}></Route>
        </Route>
        {/* <Route element={<Requireauth allowedroles={[]} />}></Route> */}
        <Route element={<Requireauth allowedroles={["admin", "vender"]} />}>
          <Route path="/createproduct" element={<Createproduct />} />
        </Route>
        <Route
          element={
            <Requireauth
              allowedroles={["user", "admin", "vender", "customer"]}
            />
          }
        >
          <Route path="/result" element={<Result />} />
          <Route path="/details/:id" element={<Detailspage />}></Route>

          <Route path="/getcarts" element={<Getcarts />} />
          <Route path="/rateproduct/:id" element={<Rating />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route path="/createvender" element={<CreateVender />}></Route>
          <Route path="/getvender" element={<Getvender />}></Route>
          <Route path="/my-orders" element={<Myorder />}></Route>
        </Route>
        <Route element={<Requireauth allowedroles={["vender"]} />}>
          <Route path="/updatevender" element={<UpdateVender />}></Route>
          <Route path="/vender-console/" element={<Venderconsole />}>
            <Route path="products" element={<Products />}></Route>
            <Route path="sales" element={<Sales />} />
            <Route path="orders" element={<Orders />} />
            <Route path="createproducts" element={<Createproduct />} />
            <Route path="updateproduct" element={<Updateproduct />} />
          </Route>
        </Route>
        <Route element={<Requireauth allowedroles={["admin"]} />}>
          <Route path="/admin-panel/" element={<Adminpage />}>
            <Route path="getvenders" element={<Getvenders />} />
            <Route path="getproducts" element={<Adminproducts />}></Route>
            <Route path="createproducts" element={<Createproduct />} />
            <Route path="updateproduct" element={<Updateproduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="getalluser" element={<Getalluser />} />
          </Route>
        </Route>
        <Route path="*" element={<Accessdenied />} />
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default App;
