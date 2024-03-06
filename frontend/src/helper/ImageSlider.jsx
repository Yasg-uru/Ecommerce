import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

const ImageSlider = () => {
  const slides = [
    {
      url: "https://static.vecteezy.com/system/resources/previews/000/483/336/original/shopping-e-commerce-concept-isometric-poster-vector.jpg",
      caption: "first silde",
    },
    {
      url: "https://tse1.explicit.bing.net/th?id=OIP.JzWR2BgiZ0DoQE6NxuDdDQHaFk&pid=Api&P=0&h=180",
      caption: "second slide",
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.LbWj8r52NjMD18EBNk2kYQHaEK&pid=Api&P=0&h=180",
      caption: "third slide",
    },
  ];
  const divstyle={
    display:`flex`,
    justifyContent:`center`,
    alignItems:`center`,
    height:`400px`,
    
   
  }
  return <div className="slide-container">
    <Slide>
      {
        slides.map((images,index)=>(
          <div key={index}>
            <div style={{...divstyle,background:`url(${images.url})`, backgroundRepeat: 'no-repeat',backgroundSize:`contain`}}>

            </div>

          </div>
        ))
      }
    </Slide>
  </div>;
};

export default ImageSlider;
