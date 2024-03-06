import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useDispatch} from "react-redux"
import { registeruser } from "../../slices/authSlice";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });
  const [previewimage, setpreviewimage] = useState("");

  const handllechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const getimage = (event) => {
    // event.preventDefault();
    const uploadfile = event.target.files[0];
    if (uploadfile) {
      setformdata({
        ...formdata,
        profile: uploadfile,
      });
      const filereader = new FileReader();
      filereader.readAsDataURL(uploadfile);
      filereader.addEventListener("load", function () {
        setpreviewimage(this.result);
      });
    }
  };
  const submitform=(event)=>{
    event.preventDefault();
   dispatch(registeruser(formdata));
   navigate("/login")
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FF0055] to-[#FF00A2]">
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-lg shadow-lg sm:w-96 md:w-2/3 lg:w-3/4 xl:w-3/4 2xl:w-1/2 flex flex-col sm:flex-row">
        {/* Left side with profile picture selection */}
        <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
          <label
            htmlFor="profilePicture"
            className="block mb-2 text-gray-700 text-sm font-bold"
          >
            Select profile Picture
          
            <div className="relative rounded-full overflow-hidden w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72">
            <input
              type="file"
              id="profilePicture"
              name="profile"
             
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={getimage}
            />
           {
            previewimage?(
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <img className="text-gray-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" src={previewimage}/>
                
             
            </div>
            ):(
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                +
              </span>
            </div>
            )
           }
          </div>
        </label>
        </div>
        

        {/* Right side with signup form */}
        <div className="flex-grow">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-8 text-center text-gray-800">
            Sign Up
          </h2>
          <form onSubmit={submitform} className="animate__animated animate__fadeIn">
            <div className="mb-8">
              <label
                htmlFor="profileName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                profile Name
              </label>
              <input
                type="text"
                id="profileName"
                name="name"
                value={formdata.name}
                onChange={handllechange}
                className="w-full px-6 py-4 border rounded focus:outline-none focus:border-purple-500 text-xl"
                placeholder="Enter your profile name"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formdata.email}
                onChange={handllechange}
                className="w-full px-6 py-4 border rounded focus:outline-none focus:border-purple-500 text-xl"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-8 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formdata.password}
                  onChange={handllechange}
                  className="w-full px-6 py-4 border rounded focus:outline-none focus:border-purple-500 text-xl"
                  placeholder="Enter your password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 cursor-pointer ml-2"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 cursor-pointer ml-2"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF0055] to-[#FF00A2] text-white py-4 px-8 rounded-full hover:bg-purple-700 focus:outline-none transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Sign Up
            </button>
            <p className="text-green-500 text-md cursor-pointer ">if you have already an account please <span className="text-red-500 font-bold underline" onClick={()=>{navigate("/login")}}>Login</span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
