import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getadminproduct } from '../slices/productSlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteproduct } from "../slices/productSlice.js";
import { useNavigate } from 'react-router-dom';
const Adminproducts = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getadminproduct());


    },[])
    const navigate=useNavigate();
    
    const products=useSelector((state)=>state.product.adminproducts)
    const [dropdown, setdropdown] = useState(Array(products.length).fill(false));
    const toggleDropdown = (index) => {
      setdropdown((prev) => {
        const newDropdown = [...prev];
        newDropdown[index] = !newDropdown[index];
        return newDropdown;
      });
    };

  return (
    <div className="h-full w-full p-6">
    <div className="w-full flex items-center">
      <input
        type="text"
        className="text-white bg-black border-[0.5px] border-cyan-700 w-full py-2 rounded-lg"
        placeholder="Search products"
      />
      <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 border border-blue-500 rounded transition-all duration-300 transform hover:scale-105">
        Search
      </button>
    </div>

    <div className="w-full h-auto ">
      {products &&
        products.map((product, index) => (
          <div className=" overflow-y-auto bg-black border-[1px] border-cyan-500 rounded-lg shadow-lg shadow-cyan-500 overflow-hidden p-4 mt-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {/* Product Images Section */}
              <div className="md:col-span-1">
                <Slider {...settings} className="h-[300px] w-[500px]">
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <img
                        className="h-full w-full object-cover object-center"
                        src={image}
                        alt={`${product.name}-image-${index}`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Product Details Section */}
              <div className="md:col-span-1">
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Price:</span>
                    <span className="text-blue-500 font-semibold">{`₹​${product.productvariations[0].price}`}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Stock:</span>
                    <span className="text-green-500 font-semibold">
                      {product.productvariations[0].stock} available
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-flow-col gap-4">
                    
                      <button  className="text-green-500  flex justify-center items-center text-2xl gap-2" onClick={()=>navigate("/admin-panel/updateproduct",{state:{id:product._id,product:product}})}>
                        <FaEdit color="green" size={36} />
                        <span> Edit</span>
                      </button>
                   
               
                    <button className="text-red-500  flex justify-center items-center text-2xl gap-2" onClick={()=>dispatch(deleteproduct(product._id))}>
                      <MdDelete color="red" size={36} />
                      <span> Delete</span>
                    </button>
                  </div>
                  <div className="md:col-span-2 relative mt-2">
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => toggleDropdown(index)}
                    >
                      {dropdown[index] ? "Hide" : "Show"} Variations
                    </button>
                    <table
                      className={`${
                        dropdown[index] ? "block" : "hidden"
                      } w-full mt-6 table-auto border border-collapse border-gray-800`}
                    >
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border text-white">
                            Attribute
                          </th>
                          <th className="px-4 py-2 border text-white">
                            Name
                          </th>
                          <th className="px-4 py-2 border text-white">
                            Price
                          </th>
                          <th className="px-4 py-2 border text-white">
                            Stock
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.productvariations.map(
                          (variation, vIndex) => (
                            <tr key={vIndex}>
                              <td className="px-4 py-2 border text-white">
                                {variation.attribute.color} -{" "}
                                {variation.attribute.size}
                              </td>
                              <td className="px-4 py-2 border text-white">
                                {variation.name}
                              </td>
                              <td className="px-4 py-2 border text-white">
                              &#8377;{variation.price}
                              </td>
                              <td className="px-4 py-2 border text-white">
                                {variation.stock}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>

  )
}

export default Adminproducts
