import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myorders } from "../../slices/orderSlice.js";

const Myorder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myorders());
  }, []);

  const orders = useSelector((state) => state.order.myorders);

  return (
    <div className="h-[100vh] flex items-center flex-col p-5">
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Search your orders here"
          className="px-4 py-2 w-[60vw] border border-gray-300 rounded-md focus:outline-none focus:border-[#FF0055] transition duration-300 ease-in-out"
        />
        <button className="bg-gradient-to-r from-[#FF0055] to-[#FF00A2] text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out hover:from-[#ff0055d6] hover:to-[#7a1053]">
          Search Order
        </button>
      </div>
      <div className="shadow-2xl h-[90vh] border-[0.5px] border-slate-900 mt-8 w-full flex flex-col gap-3 p-4">
        {orders?.products?.map((item, index) => (
          <div
            key={index}
            className="h-[20vh] w-full shadow-lg hover:shadow-2xl flex justify-between mt-4 p-4"
          >
            <img
              className="h-[15vh] w-[14vw]"
              src= {item?.product?.images[0]}
              alt=""
            />
            <div id="info-div" className="flex flex-col ">
              <h1 className="text-slate-800 font-bold ">
                {item?.product?.name}
              </h1>
              <div className="flex gap-2">
                <p>
                  color: {item?.product?.productvariations[0]?.attribute?.color}
                </p>
                <p>
                  Size:{item?.product?.productvariations[0]?.attribute?.size}
                </p>
                <p>Quantity:{item?.quantity}</p>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold"> &#8377;{item?.price}</h1>
            </div>
            <div>
              <h1>Delivered on Jul , 2023</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorder;
