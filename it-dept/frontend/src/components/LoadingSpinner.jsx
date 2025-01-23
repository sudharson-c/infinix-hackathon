import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00FF1A]"></div>
    </div>
  );
};

export default LoadingSpinner;
