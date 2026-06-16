import React from 'react';

export const NotebookHeader = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1
        className="font-bold text-[40px] text-[#F2F2F2] leading-normal"
        style={{ fontFamily: "'SFU Futura', sans-serif" }}
      >
        Notebook
      </h1>
      <button className="flex justify-center items-center px-10 py-3 gap-3 rounded-[10px] border border-[#4CA3FF] bg-[#323A49] text-white font-semibold cursor-pointer hover:opacity-80 transition-opacity">
        Create new problem
      </button>
    </div>
  );
};
