import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Productcard from "../../helper/Productcard.jsx";
import { getproducts } from "../../slices/productSlice.js";
function Result() {
  const resultproducts = useSelector((state) => state.product.products);
  console.log("this is a result product" + resultproducts);

  return (
    <>
      <div className="h-[100vh]  grid grid-cols-4 overflow-auto ">
        <div className="h-[100vh] w-full grid grid-flow-row p-3"></div>
        <div className="col-span-3 h-[10vh]  ">
          <h1 className="text-center text-xl font-bold">
            Total results:{resultproducts?.length}
          </h1>
          <div className="flex flex-row gap-12 justify-center items-center ">
            <p>sort by</p>
            <p>Relevence</p>
            <p>Popularity</p>
            <p>price --low to high</p>
            <p>price --high to low</p>
          </div>
          <div className="flex flex-col mt-11 p-6">
            {resultproducts?.map((product, index) => (
              <Productcard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Result;
