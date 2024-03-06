import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createorder, getkey, verification } from "../../slices/orderSlice";
import toast from "react-hot-toast";

function CheckOut() {
  const location = useLocation();
  console.log("this is a state:" + location.state);
  location.state.BuyproductArray.forEach((item, index) => {
    console.log(`Item ${index + 1}:`, item);
  });
  const { BuyproductArray, product, total } = location.state;

  const [buy, setBuy] = useState({
    detailarray: [],
    id: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch getkey action
    dispatch(getkey());

    // Set buy object
    setBuy({
      detailarray: BuyproductArray,
      id: product?._id,
    });

    // Create order object
    const orderData = {
      products: BuyproductArray.map((item) => ({
        productid: !product?item?.product?._id:product._id,
        variation: !product?item?.product?.productvariations[0]?._id:item._id,
        quantity: 2, // Change quantity accordingly
      })),
      shippingaddress: {
        address: "123 Main St",
        city: "Cityville",
        state: "Stateville",
        zipcode: "12345",
        country: "Countryville",
      },
    };

    // Dispatch createorder action with orderData
    dispatch(createorder(orderData));
  }, []);
  // }, [dispatch, BuyproductArray, product]);
  const [formdata, setformdata] = useState({
    products: BuyproductArray.map((item) => ({
      productid:product? product._id:item?.product?._id,
      variation: product?item._id:item?.product?.productvariations[0]._id,
      quantity: 2, // Change quantity accordingly
    })),
    shippingaddress: {
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  });

  const handleformchange = (event) => {
    const { name, value } = event.target;
    setformdata((prevData) => ({
      ...prevData,
      shippingaddress: {
        ...prevData.shippingaddress,
        [name]: value,
      },
    }));
  };

  const razorpaykey = useSelector((state) => state.order.key);
  const order_id = useSelector((state) => state.order.order_id);
  const { ispaymentverified } = useSelector((state) => state.order);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_order_id: "",
    razorpay_signature: "",
   
  };//this part is updated for finding the product during the verification process
  const handleorder = async (event) => {
    event.preventDefault();
    console.log("this is a handleorder function called:")
    if (
      !formdata.shippingaddress.city ||
      !formdata.shippingaddress.state ||
      !formdata.shippingaddress.zipcode ||
      !formdata.shippingaddress.country
    ) {
      toast.error("please fill your Address");
      return;
    }
    // event.stopPropagation();
    if (!razorpaykey || !order_id) {
      toast.error("razorpaykey and order id is missing")
      return;
    }
    const options = {
      key: razorpaykey,
      // amount: 100,
      currency: "INR",
      name: "lecture managment .Ltd",
      description: "LMS project",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.66elZ0rdKa61JlWQw8G7XgHaGf&pid=Api&P=0&h=180",
      order_id: order_id,
      handler: async function (response) {
        console.log("this is a response object :", response);
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_order_id = response.razorpay_order_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        console.log("this is a payment detail:" + paymentDetails);
        toast.success("payment successfully");
        const res =  dispatch(verification(paymentDetails));
        ispaymentverified
          ? toast.success("payment is successfull........")
          : toast.error("oops failed to verification");
      },
      prefill: {
        name: "yash choudhary",
        email: "yashpawar12122004@gmail.com",
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentobject = new window.Razorpay(options);
    paymentobject.open();
  };
  return (
    
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-10 gap-4">
      <form
        onSubmit={handleorder}
        className="md:col-span-7 shadow-2xl flex flex-col gap-4 p-4"
      >
        <h1 className="text-2xl font-bold text-center">Address Form</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formdata.shippingaddress.city}
            onChange={handleformchange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="text-gray-700 text-sm font-semibold"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formdata.shippingaddress.state}
            onChange={handleformchange}
            placeholder="Enter your state"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="country"
            className="text-gray-700 text-sm font-semibold"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formdata.shippingaddress.country}
            onChange={handleformchange}
            placeholder="Enter your country"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="zipcode"
            className="text-gray-700 text-sm font-semibold"
          >
            Pincode
          </label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formdata.shippingaddress.zipcode}
            onChange={handleformchange}
            placeholder="Enter your country"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#FF0055] to-[#FF00A2] h-9 w-full rounded-lg ring-2 ring-white text-white font-bold hover:bg-gradient-to-r hover:from-[#ff0055d6] hover:to-[#7a1053]"
        >
          SAVE AND DELIVER
        </button>
      </form>
      <div className="md:col-span-3 flex flex-col shadow-2xl h-[50vh] m-4 border-[0.5px] border-slate-600 p-6">
        <h1 className="text-xl">Price Details</h1>

        <table className="w-full">
          <tbody className="flex flex-col gap-3">
            <tr className="flex justify-between">
              <td>Price ({BuyproductArray.length} item)</td>
              <td className="text-xl text-green-500 font-bold">
                &#8377;{total}
              </td>
            </tr>
            <tr className="flex justify-between">
              <td>Delivery Charges</td>
              <td className="text-green-500">Free</td>
            </tr>
            <tr className="flex justify-between">
              <td>Total Payable</td>
              <td className="text-xl text-green-500 font-bold">
                &#8377;{total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckOut;
