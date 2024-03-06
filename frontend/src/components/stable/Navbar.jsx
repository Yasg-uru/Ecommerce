import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // If you're using React Router
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../slices/productSlice";
import { IoPersonSharp } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import { logout } from "../../slices/authSlice";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const [isdrop, setisdrop] = useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  const handlesearch = (event) => {
    event.preventDefault();
    dispatch(getproducts(searchquery));
    navigate("/result");
  };
  const handledrop = () => {
    setisdrop(!isdrop);
  };
  const { isLoggedIn,role } = useSelector((state) => state.auth);
  console.log("this is a role of the user :"+role)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          Shopping karo
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handlesearch}
          className="flex items-center justify-center w-[50vw] "
        >
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 border border-gray-600 rounded w-full"
            value={searchquery}
            onChange={(e) => {
              setsearchquery(e.target.value);
            }}
          />

          <button type="submit">
            {" "}
            <FaSearch color="white" size={25} style={{ marginLeft: "5px" }} />
          </button>
        </form>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          {
           role==='admin' ?<Link to={'/admin-panel'} className="text-white hover:text-gray-300">Admin panel</Link>:
           <Link to="/createvender" className="text-white hover:text-gray-300">
            Become a seller
          </Link>
         
          }
          <Link to="/getcarts" className="text-white hover:text-gray-300">
            Cart
          </Link>
          {!isLoggedIn ? (
            <Link to="/signup" className="text-white hover:text-gray-300 ">
              <button className="bg-gradient-to-r from-[#FF0055] to-[#FF00A2] text-white py-1 border-1 border-white px-4 rounded-full transition duration-300 ease-in-out hover:from-[#ff0055d6] hover:to-[#7a1053]">
               signup
              </button>
            </Link>
          ) : (
            <div className="relative group">
              <IoPersonSharp
                onClick={handledrop}
                size={30}
                className="cursor-pointer"
                color="#FF0055"
              />
              {/* Dropdown Content */}
              {isdrop && (
                <div className="absolute w-[15vw] right-0 mt-2 bg-white p-2 rounded shadow-lg border border-gray-300">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/my-orders"
                        className="block font-bold text-green-500 py-2 hover:bg-gray-100 transition duration-300"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={()=>
                          {dispatch(logout())
                        navigate("/")
                          }
                        }
                        className="block text-red-500 py-2 hover:bg-gray-100 transition duration-300"
                      >
                        <div className="flex items-center gap-1 w-full">
                          <FaPowerOff />
                          Logout
                        </div>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block text-gray-800 py-2 hover:bg-gray-100 transition duration-300"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
{/* //we will working after the completion of the website */}
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2">
          <Link to="/" className="block text-white py-2">
            Home
          </Link>
          <Link to="/products" className="block text-white py-2">
            Products
          </Link>
          <Link to="/cart" className="block text-white py-2">
            Cart
          </Link>
          <Link to="/account" className="block text-white py-2">
            Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
