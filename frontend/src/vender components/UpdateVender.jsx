import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { getvender, updatevender } from "../slices/venderSlice";
const UpdateVender = () => {
  const [Editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    contact: {
      phone: "",
      email: "",
      website: "",
      socialmedia: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [name]: value,
      },
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        socialmedia: {
          ...prevData.contact.socialmedia,
          [name]: value,
        },
      },
    }));
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatevender(formData));
    console.log("Form submitted:", formData);
  };
  useEffect(() => {
    dispatch(getvender());
  }, []);
  const vender = useSelector((state) => state?.vender?.venderdata);
  console.log("this is a vender " + vender);
  useEffect(() => {
    if (vender) {
      setFormData({
        description: vender?.description,
        address: {
          street: vender?.address?.street,
          city: vender?.address?.city,
          state: vender?.address?.state,
          country: vender?.address?.country,
          zipcode: vender?.address?.zipcode,
        },
        contact: {
          phone: vender?.contact?.phone,
          email: vender?.contact?.email,
          website: vender?.contact?.website,
          socialmedia: {
            facebook: vender?.contact?.socialmedia?.facebook,
            twitter: vender?.contact?.socialmedia?.twitter,
            instagram: vender?.contact?.socialmedia?.instagram,
          },
        },
      });
    }
  }, [vender]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-3 p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Vendor Information
        </h2>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter vendor description"
            readOnly={!Editing}
          />
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Street"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="city"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="state"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="country"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.address.zipcode}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="zipcode"
              readOnly={!Editing}
            />
          </div>
          {/* Add more address fields here (city, state, country, zipcode) */}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.contact.phone}
              onChange={handleContactChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Phone"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.contact.email}
              onChange={handleContactChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Email"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-600"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.contact.website}
              onChange={handleContactChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Website"
              readOnly={!Editing}
            />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="facebook"
              className="block text-sm font-medium text-gray-600"
            >
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={formData.contact.socialmedia.facebook}
              onChange={handleSocialMediaChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Facebook"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-600"
            >
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              value={formData.contact.socialmedia.twitter}
              onChange={handleSocialMediaChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Twitter"
              readOnly={!Editing}
            />
          </div>
          <div>
            <label
              htmlFor="instagram"
              className="block text-sm font-medium text-gray-600"
            >
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={formData.contact.socialmedia.instagram}
              onChange={handleSocialMediaChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Instagram"
              readOnly={!Editing}
            />
          </div>
          <div className="flex justify-center items-center  cursor-pointer">
            <p>Edit</p>
            <CiEdit
              size={36}
              color="green"
              className="cursor-pointer"
              onClick={() => setEditing(!Editing)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#FF0055] to-[#FF00A2] h-10 rounded-lg text-white font-bold hover:bg-gradient-to-r hover:from-[#ff0055d6] hover:to-[#7a1053]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateVender;
