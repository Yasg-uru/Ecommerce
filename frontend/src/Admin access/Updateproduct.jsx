import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import productSlice, { createproducts, updateproduct } from "../slices/productSlice";
import { useLocation } from "react-router-dom";
const Updateproduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();

const {product,id}=location.state;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    tags: [],
    images: [],
    productvariations: [],
    isFeatured: false,
    isAvailable: false,
  });
  useEffect(() => {
    setFormData({
      name: product?.name,
      description: product.description,
      category: product.category,
      brand: product.brand,
      tags: product.tags,
      images: product.images,
      productvariations: product.productvariations,
      isFeatured: product.isFeatured,
      isAvailable: product.isAvailable,
    });
  }, []);
  const handelchange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handletagchange = (event) => {
    const { value } = event.target;
    const arr = value.split(",");
    setFormData({
      ...formData,
      tags: arr.map((item) => item.trim()),
    });
  };
  const handleaddvariation = () => {
    setFormData({
      ...formData,
      productvariations: [
        ...formData.productvariations,

        {
          name: "",
          price: 0,
          stock: 0,
          attribute: {
            color: "",
            size: "",
          },
        },
      ],
    });
  };
  const handlechangevariation = (index, key, value) => {
    const variations = [...formData.productvariations];
    if (key === "stock" || key === "price" || key === "name") {
      variations[index] = {
        ...variations[index],
        [key]: value,
      };
    } else if (key === "color" || key === "size") {
      variations[index] = {
        ...variations[index],
        attribute: {
          ...variations[index].attribute,
          [key]: value,
        },
      };
    }
    setFormData({
      ...formData,
      productvariations: variations,
    });
  };
  const handleImageChange = (event) => {
    const filearray = Array.from(event.target.files);
    setFormData({
      ...formData,
      images: filearray,
    });
    console.log("Selected Images:", [...formData.images, ...files]);
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    
    dispatch(updateproduct(id,formData));
  };
  const handlereset = (event) => {
    event.preventDefault();
    setFormData({
      name: "",
      description: "",
      category: "",
      brand: "",
      tags: [],
      images: [],
      productvariations: [],
      isFeatured: false,
      isAvailable: false,
    });
  };
  return (
    <div className="h-[100vh] w-full bg-black overflow-y-auto">
      <h1 className="text-3xl font-bold text-center text-white underline mb-3">
        Update Product Form
      </h1>
      <form
        onSubmit={handlesubmit}
        onReset={handlereset}
        className="h-[70vh] w-[70vw]   mx-auto border-2 border-slate-900 p-4 overflow-y-auto"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="mb-1 text-white">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handelchange}
            className="border- bg-slate-800 text-white border-2 border-white "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="images" className="mb-1 text-white">
            Images
          </label>
          <input
            name="images"
            type="file"
            // accept="image/*"
            multiple
            onChange={handleImageChange}
            className=" border-2 border-white  text-white bg-black"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="description" className="mb-1 text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handelchange}
            className="border-2 border-white bg-slate-800 text-white "
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="category" className="mb-1 text-white">
            category
          </label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handelchange}
            className="border-2 border-white text-white  bg-black"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="tags" className="mb-1 text-white">
            tags:(comma-separated)
          </label>
          <input
            name="tags"
            type="text"
            value={formData.tags.join(",")}
            onChange={handletagchange}
            className="border-2 border-white bg-slate-800 text-white"
          />
        </div>
        <div className="flex justify-around  m-3 w-full">
          <label htmlFor="isAvailable" className="mb-1 text-white">
            isAvailable
          </label>
          <input
            type="checkbox"
            name="isAvailable"
            value={formData.isAvailable}
            onChange={handelchange}
            className="bg-slate-500"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="brand" className="mb-1 text-white">
            brand
          </label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handelchange}
            type="text"
            className="border-2 border-slate-950 bg-slate-800 text-white"
          />
        </div>
        <div className="flex flex-col space-y-4">
          {formData.productvariations.map((variation, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label
                htmlFor="variationname"
                className="flex flex-col text-white"
              >
                <span className="text-sm">Variation Name:</span>
                <input
                  name={`variationname-${index}`}
                  type="text"
                  value={variation.name}
                  onChange={(e) =>
                    handlechangevariation(index, "name", e.target.value)
                  }
                  className="border rounded p-2 bg-slate-800 text-white"
                />
              </label>

              <label className="flex flex-col text-white">
                <span className="text-sm">Variation Price:</span>
                <input
                  type="number"
                  value={variation.price}
                  onChange={(e) =>
                    handlechangevariation(
                      index,
                      "price",
                      parseFloat(e.target.value)
                    )
                  }
                  className="border rounded p-2 bg-slate-800 text-white"
                />
              </label>

              <label className="flex flex-col text-white">
                <span className="text-sm">Variation Stock:</span>
                <input
                  type="number"
                  value={variation.stock}
                  onChange={(e) =>
                    handlechangevariation(
                      index,
                      "stock",
                      parseInt(e.target.value)
                    )
                  }
                  className="border rounded p-2 bg-slate-800 text-white"
                />
              </label>

              <label className="flex flex-col text-white">
                <span className="text-sm">Variation Color:</span>
                <input
                  type="text"
                  value={variation.attribute.color}
                  onChange={(e) =>
                    handlechangevariation(index, "color", e.target.value)
                  }
                  className="border rounded p-2 bg-slate-800 text-white"
                />
              </label>

              <label className="flex flex-col text-white">
                <span className="text-sm">Variation Size:</span>
                <input
                  type="text"
                  value={variation.attribute.size}
                  onChange={(e) =>
                    handlechangevariation(index, "size", e.target.value)
                  }
                  className="border rounded p-2 bg-slate-800 text-white"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleaddvariation}
            className="bg-blue-500 text-white rounded p-2 w-[30vw] mx-auto"
          >
            Add Variation
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full m-4"
          >
           Save changes
          </button>
          <button
            className="bg-blue-500 text-white rounded p-2 w-full "
            type="reset"
          >
            {" "}
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Updateproduct;
