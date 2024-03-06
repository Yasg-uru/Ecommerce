import {Link, Outlet} from "react-router-dom"
function Adminpage(){
    return <div className="h-[100vh] w-full bg-black overflow-y-auto" >
<nav class="bg-gradient-to-r from-purple-700 via-red-500 to-cyan-600 p-4">
  <div class="container mx-auto flex justify-between items-center">
   
    <a href="#" class="text-white text-lg font-bold">Vendor Console</a>

    
    <div class="space-x-4">
      <Link to="getvenders" class="text-white hover:text-cyan-300">Get All Vendors</Link>
      <Link to="createproducts" class="text-white hover:text-cyan-300">Create Product</Link>
      <Link to="getproducts" class="text-white hover:text-cyan-300">get products</Link>
      <Link to="orders" class="text-white hover:text-cyan-300">Orders</Link>
      <Link to="getalluser" class="text-white hover:text-cyan-300">users</Link>
    </div>
  </div>
</nav>
<Outlet/>
    </div>
}
export default Adminpage;
