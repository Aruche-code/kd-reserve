import React from 'react';

const Loader = () => {
  return (
    <div className=" fixed flex flex-col items-center justify-center h-screen w-full opacity-70 bg-slate-100 pr-12 pb-8">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-14 w-14 mb-4"></div>
      <p className="text-xl font-semibold mb-4">Loading...</p>
    </div>
  );
};

export default Loader;