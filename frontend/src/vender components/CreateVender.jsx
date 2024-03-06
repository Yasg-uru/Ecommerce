import React, { useState } from 'react';
import {useDispatch} from "react-redux"
import { createvender } from '../slices/venderSlice';
import {Link } from "react-router-dom";
import { getme } from '../slices/authSlice';

const CreateVendor = () => {
  const [formData, setFormData] = useState({
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
    },
    contact: {
      phone: '',
      email: '',
      website: '',
      socialmedia: {
        facebook: '',
        twitter: '',
        instagram: '',
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
  const dispatch=useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(createvender(formData));
   dispatch(getme())
    console.log('Form submitted:', formData);
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <Link to={`/vender-console`} className='text-green font-bold '>If you are already seller then view console</Link>
      <form onSubmit={handleSubmit} className="bg-white mt-3 p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Vendor Information</h2>

        {/* Vendor Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
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
          />
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">
              city
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="city"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-600">
              state
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="state"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
              country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="country"
            />
          </div>
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-600">
              zipcode
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.address.zipcode}
              onChange={handleAddressChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="zipcode"
            />
          </div>
          {/* Add more address fields here (city, state, country, zipcode) */}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-600">
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
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#FF0055] to-[#FF00A2] h-10 rounded-lg text-white font-bold hover:bg-gradient-to-r hover:from-[#ff0055d6] hover:to-[#7a1053]"
        >
          Save
        </button>
      <Link to="/updatevender" className="text-sm font-bold text-red-800">if you already seller then update </Link>
      </form>
    </div>
  );
};

export default CreateVendor;
