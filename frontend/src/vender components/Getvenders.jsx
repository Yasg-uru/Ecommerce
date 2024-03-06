import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approve, getvenders, reject } from "../slices/venderSlice";
import Loader from "../../src/components/stable/Loader.jsx";
const Getvenders = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [adrop, setadrop] = useState([]);
  const [cdrop, setcdrop] = useState([]);
  const [socdrop, setsocdrop] = useState([]);
  
  useEffect(() => {
    dispatch(getvenders())
      .then(() => setloading(false))
      .catch((error) => {
        console.log("error is occured ", error);
        setloading(false);
      });
      setadrop(Array(venders.length).fill(false));
    setcdrop(Array(venders.length).fill(false));
    setsocdrop(Array(venders.length).fill(false));
  }, [dispatch]);
  const venders = useSelector((state) => state.vender.venders);

  if (!venders) {
    return <div className="text-center">vender not found</div>;
  }


  const adroptoggle = (index) => {
    setadrop((prev) => prev.map((state, i) => (index === i ? !state : state)));
  };
  const handlecdrop = (index) => {
    setcdrop((prev) => prev.map((state, i) => (index === i ? !state : state)));
  };
  const handlesocdrop = (index) => {
    setsocdrop((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };
  const handleApprove = (id) => {
    dispatch(approve(id)).then(() => dispatch(getvenders()));
  };

  const handleReject = (id) => {
    dispatch(reject(id)).then(() => dispatch(getvenders()));
  };
  if(loading){
    return <Loader/>
  }
  return (
    
    <div className="h-[100vh] w-full bg-black overflow-y-auto ">
      <h1 className="text-3xl font-bold text-center underline underline-offset-2 text-[#FF0055]">
        Venders List
      </h1>
      <div className=" mx-auto w-[90vw] shadow-2xl shadow-cyan-500 rounded-md mt-7 border-[0.2px] border-cyan-500 grid grid-flow-row p-4 gap-3">
        {venders?.map((item, index) => (
          <div
            key={index}
            className="shadow-2xl h-[40vh] grid text-white grid-flow-row gap-2 p-4 overflow-x-auto"
          >
            <div className="flex  gap-4">
              <div className="w-[30vw]">
                <h1 className="text-2xl font-extrabold text-center text-green-500  ">
                  Vender Name:{item?.user?.name}
                </h1>
              </div>
              <div className="w-[20vw]">
                {item?.status === "approved" ? (
                  <h1 className="text-green-600 text-2xl ">{item?.status}</h1>
                ) : (
                  <h1 className="text-red-700 text-2xl ">{item.status}</h1>
                )}
              </div>
              <div>
                <button
                  className="h-[6vh] w-[10vw] bg-gradient-to-r from-purple-500 to-indigo-500 cursor-pointer hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3  px-4 rounded-full focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                  onClick={() => adroptoggle(index)}
                >
                  Address info
                </button>
                {adrop[index] && (
                  <div className="">
                    <p>
                      <strong className="text-gray-600">Street:</strong>{" "}
                      {item.address.street}
                    </p>
                    <p>
                      <strong className="text-gray-600">City:</strong>{" "}
                      {item.address.city}
                    </p>
                    <p>
                      <strong className="text-gray-600">State:</strong>{" "}
                      {item.address.state}
                    </p>
                    <p>
                      <strong className="text-gray-600">Country:</strong>{" "}
                      {item.address.country}
                    </p>
                    <p>
                      <strong className="text-gray-600">Zipcode:</strong>{" "}
                      {item.address.zipcode}
                    </p>
                    {/* Add other details as needed */}
                  </div>
                )}
              </div>
              <div>
                <button
                  className="h-[6vh] w-[10vw]  bg-gradient-to-r from-purple-500 to-indigo-500 cursor-pointer hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                  onClick={() => handlecdrop(index)}
                >
                  Contact info
                </button>
                {cdrop[index] && (
                  <div className="">
                    <p>
                      <strong className="text-gray-600">Phone:</strong>{" "}
                      {item.contact.phone}
                    </p>
                    <p>
                      <strong className="text-gray-600">Email:</strong>{" "}
                      {item.contact.email}
                    </p>
                    <p>
                      <strong className="text-gray-600">State:</strong>{" "}
                      {item.contact.website}
                    </p>

                    {/* Add other details as needed */}
                  </div>
                )}
              </div>
              <div>
                <button
                  className="h-[6vh] w-[10vw] bg-gradient-to-r from-purple-500 to-indigo-500 cursor-pointer hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                  onClick={() => handlesocdrop(index)}
                >
                  Social media
                </button>
                {socdrop[index] && (
                  <div className="">
                    <p>
                      <strong className="text-gray-600">facebook:</strong>{" "}
                      {item.contact.socialmedia.facebook}
                    </p>
                    <p>
                      <strong className="text-gray-600">Twitter:</strong>{" "}
                      {item.contact.socialmedia.twitter}
                    </p>
                    <p>
                      <strong className="text-gray-600">Instagram:</strong>{" "}
                      {item.address.instagram}
                    </p>
                    <p>
                      <strong className="text-gray-600">Country:</strong>{" "}
                      {item.address.country}
                    </p>
                    <p>
                      <strong className="text-gray-600">Zipcode:</strong>{" "}
                      {item.address.zipcode}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              {item?.status === "pending" ? (
                <>
                  {" "}
                  <button
                    onClick={() => handleApprove(item._id)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                  >
                    approve
                  </button>{" "}
                  <button
                    onClick={() => handleReject(item._id)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                  >
                    Reject
                  </button>
                </>
              ) : item?.status === "approved" ? (
                <button
                  onClick={() => handleReject(item._id)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={() => handleApprove(item._id)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getvenders;
