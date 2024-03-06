import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../../slices/authSlice";
const Forgotpassword = () => {
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    email: "",
  });

  const handlesubmit = (event) => {
    event.preventDefault();
    dispatch(forgotpassword(formdata));
  };
  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  return (
    <div className="h-[100vh] w-full bg-black flex justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="p-4 h-[30vh] w-[50vw] shadow-lg flex flex-col gap-2 shadow-cyan-500 border-cyan-500 border-[0.3px] rounded"
      >
        <h1 className="text-white text-center text-xl">Forgot password</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            placeholder="Enter email"
            className="text-white border-2 border-cyan-500 bg-black p-2"
          />
        </div>
        <button
          type="submit"
          class="bg-cyan-500 border-[0.5px] border-cyan-500 hover:bg-cyan-700 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default Forgotpassword;
