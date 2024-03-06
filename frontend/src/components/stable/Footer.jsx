import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 fixed w-full bottom-0 ">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Awesome Footer</h2>
          <p className="text-sm mb-4">Stay connected with us!</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-gray-700 p-2">
        <p className="text-center text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
