// LoginForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate=useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const submitform = (event) => {
    event.preventDefault();
    if (!formdata.email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm)) {
      toast.error("Please enter a valid email");
    }
    //  else if (
    //   !formdata.password.match(
    //     /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
    //   )
    // ) {
    //   toast.error("Please enter a strong password");
    // } 
    else {
      dispatch(login(formdata));
      navigate("/")

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitform}
        className="bg-white shadow-md rounded px-6 py-8 mb-4 w-80 md:w-96"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
          />
        </div>
        <div className="flex flex-col items-center justify-between ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link to={`/forgotpassword`} className="text-sm font-bold text-green-500 mt-2">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
