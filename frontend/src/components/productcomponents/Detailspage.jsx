import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import StarRating from "react-star-rating-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createcart, getcart } from "../../slices/cartSlice";
import { addreview, getproductbyid } from "../../slices/productSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Detailspage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addedcart, setaddedcart] = useState(false);
  const [product, setproduct] = useState(null);
  const [price, setprice] = useState(0);
  const [total, settotal] = useState(0);
  const [BuyproductArray, setBuyproducutArray] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/product/products/${id}`,
        {
          withCredentials: true,
        }
      );

      setproduct(res.data.products);
    } catch (error) {
      toast.error(error?.message || "failed to fetch data");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (
      product &&
      product.productvariations &&
      product.productvariations.length > 0
    ) {
      setBuyproducutArray([...product?.productvariations[0]]);
      console.log("this si a " + product?.productvariations[0]);
    }

    BuyproductArray.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });
  }, []);
  useEffect(() => {
    let sum = 0;
    BuyproductArray?.forEach((element) => {
      sum += element?.price;
    });
    settotal(sum);
  }, [BuyproductArray]);
  const handlecart = async () => {
    dispatch(createcart(product._id));
    dispatch(getcart());
    setaddedcart(true);
  };
  const handleproductvariationclick = (variation) => {
    setproduct({
      ...product,
      name: variation?.name,
      price: variation?.price,
    });
    setprice(variation.price);
  };
  const handlebuy = (variation) => {
    const id = BuyproductArray.find(
      (item) => item._id.toString() === variation._id.toString()
    );
    if (!id) {
      setBuyproducutArray((prevArray) => [...prevArray, variation]);
    }
  };

  const handlebuyproduct = () => {
    const ID = 56;
    navigate("/checkout", { state: { BuyproductArray, product, total } });
  };

  product?.review?.forEach((item, i) => {
    console.log("this is a review" + item.text);
  });
  return (
    <>
      <div className="h-[100vh] w-full grid grid-cols-10">
        <div className="col-span-4  flex flex-col gap-10">
          <Slider className=" h-[30vh] w-full" {...settings}>
            {product?.images?.map((imageUrl, index) => (
              <div className="h-[30vh] w-[42vw]" key={index}>
                <img
                  src={imageUrl}
                  className="h-full w-full"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
          <div className=" h-[10vh] w-full p-4 flex items-center gap-4">
            {!addedcart ? (
              <button
                onClick={handlecart}
                className="text-white font-bold h-[50px] w-52 bg-gradient-to-r from-[#FF0055] to-[#FF00A2] ring-1 ring-offset-2 rounded-md  "
              >
                Add Cart
              </button>
            ) : (
              <button
                onClick={handlebuyproduct}
                className=" text-white font-bold h-[50px] w-52 bg-gradient-to-r from-[#FF0055] to-[#FF00A2] ring-1 ring-offset-2 rounded-md  "
              >
                Go To Cart
              </button>
            )}
            {BuyproductArray.length > 0 ? (
              <button
                onClick={handlebuyproduct}
                className="text-white font-bold h-[50px] w-52 bg-gradient-to-r from-[#FF0055] to-[#FF00A2] ring-1 ring-offset-2 rounded-md  "
              >
                Buy Now
              </button>
            ) : (
              <button className="text-white font-bold h-[50px] w-52 bg-gradient-to-r from-[#FF0055] to-[#FF00A2] ring-1 ring-offset-2 rounded-md  ">
                Select product
              </button>
            )}
          </div>
          <div className="h-full w-full  mx-auto p-4">
            {/* <div className="flex w-full h-24  items-center gap-3 p-5">
          {
            product?.productvariations?.map((variation,index)=>(
              <button key={index} className="w-[150px] bg-gradient-to-r from-[#FF0055] to-[#FF00A2] text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-[#FF0055] transition duration-300">{variation?.attribute?.color}</button>
            ))
          }
          </div> */}
            <div className="h-[20vh] w-full cursor-pointer">
              <table className="min-w-full bg-white border-2 border-gray-300 rounded-md overflow-hidden">
                <thead className="text-white bg-gradient-to-r from-[#FF0055] to-[#FF00A2]">
                  <tr>
                    <th className="py-2 px-4">ID</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">color</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Stock</th>
                    <th className="py-2 px-4">Buy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {product?.productvariations?.map((variation, index) => (
                    <tr
                      key={index}
                      onClick={() => handleproductvariationclick(variation)}
                      className="hover:bg-gray-100"
                    >
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">{variation?.name}</td>
                      <td className="py-4 px-4">
                        {variation?.attribute?.color}
                      </td>
                      <td className="py-4 px-4">&#8377;{variation?.price}</td>
                      <td className="py-4 px-4">{variation?.stock}</td>
                      <td
                        onClick={() => handlebuy(variation)}
                        className="text-3xl text-green-500 font-bold "
                      >
                        +
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="h-full w-full" id="selected-products">
            <h1 className="text-center text-2xl font-bold text-[#FF0055] m-0 underline">
              Products to Buy
            </h1>
            <table className="min-w-full bg-white border-2 border-gray-300 rounded-md overflow-hidden">
              <thead className="text-white bg-gradient-to-r from-[#FF0055] to-[#FF00A2]">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Color</th>
                  <th className="py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {BuyproductArray?.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.attribute.color}</td>
                    <td className="py-2 px-4">&#8377;{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between w-full p-7">
              <div className="text-2xl font-bold text-green-600">Total</div>
              <div className="text-2xl font-bold text-green-600">
                &#8377;{total === 0 ? "" : total}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  col-span-6  p-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-2xl ">{product?.name}</h1>
            {/* <p className="text-xl ">{product.description}and this is a most demanding product in the market and i like this product and this product is value for money</p> */}
            <p className="text-center text-3xl font-bold ">
              &#8377;{price === 0 ? product?.productvariations[0].price : price}
            </p>
          </div>
          <div className="flex justify-center items-center shadow-lg h-[30vh] w-full  ">
            <table className="min-w-full bg-white border-2 border-gray-300 rounded-md overflow-hidden">
              <thead className="text-2xl font-bold">
                <tr>Specifications</tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                <tr className="hover:bg-gray-100">
                  <td className="py-4 px-6">Brand</td>
                  <td className="py-4 px-6">{product?.brand}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-4 px-6">category</td>
                  <td className="py-4 px-6">{product?.category}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="h-[20vh] w-full shadow-2xl border-2  mt-8 p-6">
            <h1 className="text-2xl font-bold ">Description</h1>
            <p>
              {product?.description} this is most demanding product and this is
              very helpfull in your daily life{" "}
            </p>
          </div>
          <table className="min-w-full bg-white border-2 mt-6 shadow-2xl border-gray-300 rounded-md overflow-hidden">
            <thead className="text-2xl font-bold">
              <tr className="text-2xl font-bold">warranty</tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              <tr className="hover:bg-gray-100">
                <td className="py-4 px-6">Warranty Summary</td>
                <td className="py-4 px-6">1 year</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-4 px-6">Covered in Warranty</td>
                <td className="py-4 px-6">Manufacturing Defects</td>
              </tr>
              <tr>
                <td className="py-4 px-6"> not Covered in Warranty</td>
                <td className="py-4 px-6">physical damages</td>
              </tr>
              <tr>
                <td className="py-4 px-6"> warranty service type</td>
                <td className="py-4 px-6">NA</td>
              </tr>
            </tbody>
          </table>
          <div className="relative shadow-lg w-full mt-5 h-[30vh] p-4">
            <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
            <Link to={`/rateproduct/${product?._id}`}>
              <button className="absolute right-0 top-0 shadow-lg hover:shadow-emerald-600  h-[5vh] w-[10vw]">
                Rate Product
              </button>
            </Link>
          </div>
        </div>

        <div className="h-auto w-[99vw] p-7 bg-black">
          {product?.review?.map((reviews, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-white text-lg mb-2">{reviews.text}</p>
              <StarRating
                name="productRating"
                starColor={"#009933"}
                className="text-2xl font-bold text-green-700"
                size={36}
                starCount={5}
                value={reviews?.rating}
              />
              <Slider className="h-[30vh] w-full" {...settings}>
                {reviews?.images?.map((image, index) => (
                  <div key={index} className="h-[30vh] w-[42vw]">
                    <img
                      className="h-full w-full rounded-md"
                      src={image}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detailspage;
