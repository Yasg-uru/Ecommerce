import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefromcart } from "../slices/cartSlice";

const Cart_card = ({ item }) => {
  const dispatch=useDispatch();
const id=item._id;
console.log("this is a id"+item._id);
const cartsarr=useSelector((state)=>state.cart.cart);

const product=cartsarr.find((cart)=>cart._id===id)

if(product){

  Object.keys(product).forEach((key) => {
    console.log(`${key}:`, product[key]);
  });
}
console.log("this is name and description:"+product?.product?.name + " and description is :"+product?.description)

  return (
  
      <div className="  w-full grid grid-cols-10 p-3 hover:shadow-2xl">
      <div
        id="image"
        className="h-[200px] col-span-2 flex flex-col justify-center"
      >
        <img
          
          src={product?.product?.images[0]}
          className="h-[150px] w-full"
          alt=""
        />
      </div>
      <div id="info" className="relative h-[200px] col-span-6 w-full flex flex-col p-2">
        <h1 className="text-xl font-bold">{product?.product?.name}</h1>
        <p>black</p>
        <p>Seller:yash choudhary marketings</p>
        <p className="text-xl font-bold">&#8377;{product?.product?.productvariations[0]?.price}</p>
        <div className="flex items-center justify-around w-full">
          <button className="h-[30px] w-full px-2 text-white border-2 rounded-full bg-gradient-to-r from-[#FF0055] to-[#FF00A2] ">
            Save for later
          </button>
          <button onClick={()=>dispatch(removefromcart(item?.product?._id))} className="h-[30px] w-full px-2 text-white border-2 rounded-full bg-gradient-to-r from-[#FF0055] to-[#FF00A2] hover:bg-gradient-to-r hover:from-[#a10b3de2] hover:to-[#FF00A2] ">
            Remove
          </button>
        </div>
        <div className="absolute bottom-0 w-full">
          <button className="h-[6vh] w-[20vw] bg-gradient-to-r from-[#FF0055] to-[#FF00A2] rounded-full text-white">BUY NOW</button>
        </div>
      
      </div>
      <div className="col-span-2">
        <p className="text-md font-sans ">Delivered by sun 26 feb</p>
      </div>
    </div>
      

  );
};

export default Cart_card;
