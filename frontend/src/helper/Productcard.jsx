import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";

function Productcard({ product }) {
  

  return (
    <>
      <Link to={
      `/details/${product._id}`
      }>
      <div className="grid grid-cols-3 m-6 border-[0.5px] border-white transition-transform hover:shadow-md transform hover:-translate-y-1">
        <div id="image" className="flex justify-center items-center">
          <img
            src={product?.images[0]}
            // src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg?q=70"
            alt=""
          />
        </div>
        <div id="information" className="flex flex-col ">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          {/* <p>Price: ${product?.productvariations[0]?.price}</p> */}
          <p>
            color:
            {product?.productvariations.map((variation, index) =>
              index < product?.productvariations.length - 1 ? (
                <span key={index}>{variation?.attribute.color},</span>
              ) : (
                <span key={index}>{variation?.attribute.color}</span>
              )
            )}
          </p>
        </div>
        <div className="" id="price">
          <h1 className="text-xl font-bold">
            &#8377; {product?.productvariations[0].price}
          </h1>
          {product.isAvailable ? (
            <h1 className="italic text-xl text-green-600 font-bold">
              Available
            </h1>
          ) : (
            ""
          )}
        </div>
      </div>
      </Link>
    </>
  );
}
export default Productcard;
