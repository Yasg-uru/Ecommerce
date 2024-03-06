import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvender, getvenderorders, getvenderproduct } from "../../slices/venderSlice";
import { getorders, updatetorder } from "../../slices/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.vender.venderdata);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getvender(_id));
      await dispatch(getvenderproduct(_id));
      await dispatch(getvenderorders(_id));
    };

    if (_id) {
      fetchData();
    }
  }, [_id, dispatch]);


  const orders = useSelector((state) => state.vender.orders);
  const products = useSelector((state) => state.vender.products);
  orders.forEach((item)=>{
    console.log("this is a order id "+item._id)
  })
  return (
    <div className="h-full w-full p-4">
      <h1 className=" text-white text-xl text-center font-bold ">Orders</h1>
      <div className=" h-full w-full flex flex-col gap-4 p-4">
        {orders.map((order, index) => (
          <div className="h-[30vh] w-full border-[0.5px] shadow-lg shadow-cyan-500 border-cyan-500 grid grid-cols-5">
            <div className=" col-span-2 p-2 ">
              <h1 className="text-red-700 font-bold text-xl">
                Shipping Address
              </h1>
              <p className="text-white">City:-{order.shippingaddress.city}</p>
              <p className="text-white">state:-{order.shippingaddress.state}</p>
              <p className="text-white">
                country:-{order.shippingaddress.country}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-white">
                Payment Status:{" "}
                <span
                  className={`${
                    order.payment.status === `completed`
                      ? `text-green-600`
                      : `text-red-600`
                  }`}
                >
                  {order.payment.status}
                </span>
              </p>
              <p className="text-white">
                {" "}
                Order status:{" "}
                <span
                  className={`${
                    order.status === `pending` ? `text-red-600` : `text-green-600`
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <button className="text-white h-[30px] w-[150px] border-[0.2px] border-cyan-500  bg-cyan-500 rounded-lg shadow-lg shadow-cyan-600 mt-3">
                update status
              </button>
            </div>
            <div className="col-span-1">
              <p className="text-white">
                Created At :
                <span className="text-green-600">
                  {" "}
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
