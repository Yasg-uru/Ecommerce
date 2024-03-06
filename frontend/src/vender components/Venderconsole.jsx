import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link,Outlet} from "react-router-dom"
import { getvender } from "../slices/venderSlice";
function Venderconsole(){
    const [activeTab, setActiveTab] = useState('orders');
    const dispatch=useDispatch();

useEffect(()=>{
  dispatch(getvender())

},[])
const venderinfo =useSelector((state)=>state.vender.venderdata);

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };
    return <div className="h-[100vh] w-full bg-black overflow-y-auto">
       <header className="bg-black text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
      </header>

      <nav className="bg-gradient-to-r from-purple-700 via-red-500 to-cyan-600 animate__animated animate__fadeIn animate__delay-2s overflow-hidden">
        <Link
          to="orders"
          onClick={() => showTab('orders')}
          className={`float-left block text-white text-center py-2 px-4 ${
            activeTab === 'orders' && 'bg-cyan-500'
          }`}
        >
          Orders
        </Link>
        <Link
          to="products" state={{id:venderinfo?._id}}
          onClick={() => showTab('products')}
          className={`float-left block text-white text-center py-2 px-4 ${
            activeTab === 'products' && 'bg-cyan-500'
          }`}
        >
          Products
        </Link>
        <Link
          to="sales"
          onClick={() => showTab('sales')}
          className={`float-left block text-white text-center py-2 px-4 ${
            activeTab === 'sales' && 'bg-cyan-500'
          }`}
        >
          Sales
        </Link>
        <Link
          to="createproducts"
          onClick={() => showTab('createproduct')}
          className={`float-left block text-white text-center py-2 px-4 ${
            activeTab === 'createproduct' && 'bg-cyan-500'
          }`}
        >
          Create Product
        </Link>
        <Link
          to="updateproduct"
          onClick={() => showTab('updateproduct')}
          className={`float-left block text-white text-center py-2 px-4 ${
            activeTab === 'updateproduct' && 'bg-cyan-500'
          }`}
        >
          Update product
        </Link>
      
      </nav>
      <Outlet/>

      
   
    </div>
}

export default Venderconsole;
