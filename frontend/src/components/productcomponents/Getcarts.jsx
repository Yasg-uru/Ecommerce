import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearcart, getcart } from "../../slices/cartSlice";
import Cart_card from "../../helper/Cart_card";
import { useNavigate } from "react-router-dom";

const Getcarts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcart());
  }, []);

  const navigate = useNavigate();
  const [address, setaddress] = useState("");
  const carts = useSelector((state) => state.cart.cart);
  let total = 0;
  if (!carts) {
    return (
      <div className="h-[100vh] w-full flex bg-black justify-center items-center">
        <div className="h-[20vh] w-[40vw] bg-transparent border-[0.5px] flex flex-col gap-3 justify-center items-center rounded-sm ">
          <p className="text-red-600 font-bold text-2xl"> Your cart is Empty</p>

          <button onClick={()=>navigate(-1)} className="relative overflow-hidden px-8 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-transform transform-gpu hover:scale-105 focus:outline-none focus:shadow-outline-purple active:bg-purple-800">
            Go back
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
          </button>
        </div>
      </div>
    );
  }
  carts?.forEach((product) => {
    total += product?.product?.productvariations[0].price;
  });
  const handleorder = () => {
    navigate("/checkout", { state: { BuyproductArray: carts, total } });
  };

  return (
    <div className="h-[100vh] w-full grid grid-cols-10">
      <div className="col-span-7 w-full h-[90vh] flex flex-col gap-3 p-6">
        <div className="w-[full] h-[10vh] shadow-xl">
          <form className="h-full w-full flex items-center justify-between">
            <label htmlFor="address">From Saved Address</label>
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Enter delivery Pincode"
              className="h-[20px] w-[20vw] border-2 border-black"
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            />
          </form>
        </div>
        <div className=" h-[80vh] w-full shadow-2xl flex flex-col p-4 gap-4 overflow-y-auto">
          {carts?.map((item, index) => (
            <Cart_card key={index} item={item} />
          ))}
          <button
            onClick={() => {
              dispatch(clearcart());
              dispatch(getcart());
            }}
            className=" fixed bg-gradient-to-r from-[#FF0055] to-[#FF00A2]  w-[30vw] h-[6vh] px-3 rounded-full text-white  bottom-0 right-0 "
          >
            CLEAR CART
          </button>
        </div>
      </div>
      <div className="col-span-3 w-full p-4 mt-8 shadow-2xl  h-[45vh]">
        <table className="h-full w-full ">
          <thead>PRICE DETAILS</thead>
          <tbody>
            <tr>
              <td>Price ({carts.length} items)</td>
              <td>&#8377;{total}</td>
            </tr>
            <tr>
              <td>Delivery charges</td>
              {/* we will add delivery charges after modifying backend */}
              <td>&#8377;40</td>
            </tr>
            <tr>
              <td>Discount</td>
              {/* discount is also adding after creating website  */}
              <td className="text-[green]">&#8377;10</td>
            </tr>
            <tr>
              <td>Total amount</td>
              <td>&#8377;{total}</td>
            </tr>
            <tr className="text-[green]">
              You will save &#8377; {total} on this order
            </tr>
            <tr>
              <button
                onClick={handleorder}
                className="bg-gradient-to-r from-[#FF0055] to-[#FF00A2]  w-full h-full px-3 rounded-full text-white "
              >
                PLACE ORDER
              </button>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Getcarts;
