import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-pulse animate-bounce animate-ping">
          <div className="w-full h-full rounded-full border-t-4 border-blue-500 border-solid animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
