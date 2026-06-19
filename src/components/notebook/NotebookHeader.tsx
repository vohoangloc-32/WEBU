import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotebookHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="font-bold text-[40px] text-[#F2F2F2] leading-normal h1">
        Notebook
      </h1>
      <button
        onClick={() => navigate('/create-problem')}
        className="flex justify-center items-center px-10 py-3 gap-3 rounded-[10px] border border-secondary-a70 bg-tonal-a20 text-secondary-a10 h6 cursor-pointer hover:opacity-80 transition-opacity"
      >
        Create New Problem
      </button>
    </div>
  );
};
