import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate=useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-700 to-indigo-700">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">Access Denied</h1>
        <p className="text-gray-800">Oops! It seems you don't have the required permission to access this page.</p>
        <div className="mt-8 flex justify-end">
          <button onClick={()=>navigate(-1)} className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
