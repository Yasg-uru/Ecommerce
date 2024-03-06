// import ImageSlider from "../../helper/ImageSlider";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "react-slideshow-image/dist/styles.css";
// import { Fade, Zoom, Slide } from "react-slideshow-image";
// import Slider from "react-slick";
// function Homepage() {
//   const settings = {
//     swipe: true, // Enable swipe gestures
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   };
//   const arr = [
//     {
//       url: "https://rukminim1.flixcart.com/flap/96/96/image/29327f40e9c4d26b.png?q=100",
//       caption: "Grocery",
//     },
//     {
//       url: "https://rukminim1.flixcart.com/flap/96/96/image/22fddf3c7da4c4f4.png?q=100",
//       caption: "Mobiles",
//     },
//     {
//       url: "https://rukminim1.flixcart.com/fk-p-flap/96/96/image/0d75b34f7d8fbcb3.png?q=100",
//       caption: "Fashion",
//     },
//     {
//       url: "https://rukminim1.flixcart.com/flap/96/96/image/69c6589653afdb9a.png?q=100",
//       caption: "Electronics",
//     },
//     {
//       url: "https://rukminim1.flixcart.com/flap/96/96/image/ab7e2b022a4587dd.jpg?q=100",
//       caption: "Furniture",
//     },
//     {
//       url: "https://rukminim1.flixcart.com/fk-p-flap/96/96/image/0139228b2f7eb413.jpg?q=100",
//       caption: "Appliances",
//     },
//   ];
//   const phonearray = [
//     {
//       devicename: "samsung galaxy f22",
//       price: 4334,
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.4mz1Dr4UdEk7RhTwUqVhpwHaHa&pid=Api&P=0&h=180",
//     },
//     {
//       devicename: "vivo y15",
//       price: 4334,
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.4mz1Dr4UdEk7RhTwUqVhpwHaHa&pid=Api&P=0&h=180",
//     },
//     {
//       devicename: "macbook",
//       price: 4334,
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.4mz1Dr4UdEk7RhTwUqVhpwHaHa&pid=Api&P=0&h=180",
//     },
//     {
//       devicename: "asus laptops",
//       price: 4334,
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.4mz1Dr4UdEk7RhTwUqVhpwHaHa&pid=Api&P=0&h=180",
//     },
//     {
//       devicename: "realme phones",
//       price: 4334,
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.4mz1Dr4UdEk7RhTwUqVhpwHaHa&pid=Api&P=0&h=180",
//     },
//   ];
//   const arrayforsuggetions = [
//     {
//       imageurl:
//         "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//     {
//       imageurl:
//         "https://tse1.mm.bing.net/th?id=OIP.ILmDTOhhlKkuGHUg909nxgHaHa&pid=Api&P=0&h=180",
//       price: 1299,
//     },
//   ];
//   const settingsPhoneArray = {
//     swipe: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4, // Adjust the number of slides to your preference
//     slidesToScroll: 1,
//   };
//   return (
//     <div className="flex flex-col gap-9 h-[200vh] p-6">
//       <div className="h-[20vh] w-[98%] bg-slate-50 shadow-2xl m-5 mx-auto">
//         <Slider {...settings}>
//           {arr.map((Element, index) => (
//             <div className="h-[20vh] w-8 flex flex-col gap-2">
//               <img src={Element.url} alt="" />
//               <span>{Element.caption}</span>
//             </div>
//           ))}
//         </Slider>
//       </div>
//       <ImageSlider />

//       <div>
//         <Slide {...settingsPhoneArray}>
//           {phonearray?.map((item, index) => (
//             <div
//               key={index}
//               className="h-[400px] border-[0.5px] border-slate-700 cursor-pointer w-[250px] shadow-lg   flex flex-col justify-center gap-2 items-center hover:shadow-2xl"
//             >
//               <h1 className="text-xl text-slate-600 font-bold">
//                 {item.devicename}
//               </h1>
//               <img className="h-[30vh] " src={item.imageurl} alt="" />
//               <p className="text-green-500  font-bold">Up to 70% off</p>
//             </div>
//           ))}
//         </Slide>
//       </div>
//       {/* <div className=" shadow-lg h-[10vh] w-full"> */}
//       <h1 className="text-xl ">Suggested For you</h1>
//       <Slide {...settingsPhoneArray}>
//         {arrayforsuggetions?.map((item, index) => (
//           <div
//             key={index}
//             className="h-[400px] w-[250px] shadow-lg  mx-5  flex flex-col justify-center gap-2 items-center hover:shadow-2xl"
//           >
//             <img className="h-[30vh] " src={item.imageurl} alt="" />
//             <p>Laptop Sleeve</p>
//             <p className="text-green-500  font-bold">&#8377;{item.price}</p>
//           </div>
//         ))}
//       </Slide>

//       {/* </div> */}
//     </div>
//   );
// }

// export default Homepage;
import React from "react";
import { useDispatch } from "react-redux";
import { getproducts } from "../../slices/productSlice";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const backgroundImageUrl = "https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags-copy-space_23-2148657638.jpg?w=1060&t=st=1709513354~exp=1709513954~hmac=871ccbe561dccb5995941d3ed99fb482cb1856b842fdd16518c52069b6870175"; // Replace with the actual URL of your image

  const containerStyle = {
    background: `url(${backgroundImageUrl}) center/cover no-repeat`,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white", // Set text color to be visible against the background
  };
  const dispatch=useDispatch();
const navigate=useNavigate();
  return (
    <div style={containerStyle} className="grid grid-cols-2 h-[100vh] overflow-y-auto w-full">
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">A New Online Shopping Experience</h1>
      <p className="text-lg text-center mb-8">Discover the latest trends and find amazing deals!</p>
      <button onClick={()=>{
        dispatch(getproducts(''));
        navigate("/result")
      }} className="bg-cyan-500 text-white px-6 py-2 shadow-cyan-500 shadow-lg rounded-md hover:bg-cyan-600 transition duration-300">
        Explore Now
      </button>
    </div>
    <div className="flex justify-center items-center">
      {/* You can add more content, images, or components here */}
    </div>
  </div>
  );
}

export default Homepage;

