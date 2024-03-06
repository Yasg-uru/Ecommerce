import React, { useState } from "react";
import StarRating from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addreview } from "../../slices/productSlice";
import { useParams } from "react-router-dom";
const Rating = () => {
  const { id } = useParams();
  const [formdata, setformdata] = useState({
    text: "",
    rating: 0,
    images: [],
    id: id,
  });
  const dispatch = useDispatch();
  function handlechange(event) {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }
  function handleRatingChange(value) {
    setformdata({
      ...formdata,
      rating: value,
    });
  }
  const handlechangefile = (event) => {
    // const {name, files} = event.target;

    // const filearray = [];
    // for(let i=0;i<files.length;i++){
    //   filearray.push(files[i]);
    // }
    // const imageurls = filearray.map((file) => URL.createObjectURL(file));
const filearray=Array.from(event.target.files)
    setformdata({
      ...formdata,
      images: filearray,
    });
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    dispatch(addreview(formdata));
    for (const key in formdata) {
      console.log(`${key}:${formdata[key]}`);
    }
  };
  return (
    <div className="h-[100vh] bg-slate-800 w-full border-2 border-red-800 flex justify-center items-center">
      <form 
        onSubmit={handlesubmit}
        className="h-[70vh] p-6 w-[50vw] shadow-lg flex flex-col gap-2 bg-slate-900"
      >
        <h1 className="text-2xl font-bold text-orange-400 text-center">
          Review Form
        </h1>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="text">
            Review
          </label>
          <textarea
            name="text"
            value={formdata.text}
            onChange={handlechange}
            placeholder="Enter your review"
            className="bg-slate-800 text-white "
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="images">
            Select Images
          </label>
          <input
            className="text-white"
            type="file"
            multiple
            name="images"
            onChange={handlechangefile}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="rating">
            Select Rating
          </label>
          <StarRating
            count={5} // Total number of stars
            value={3} // Initial rating
            onChange={handleRatingChange} // Callback for rating change
            size={24} // Size of the stars
            color="#00b300"
          />
        </div>
        <button
          type="submit"
          className="h-[6vh] w-full bg-[#fb641b] px-2 text-white tex-xl rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rating;
