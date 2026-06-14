import React from 'react';
import { Logo2 } from '@/components/ui/Logo2';
// import { Button } from '@/components/ui/Button';
// import { useNavigate } from 'react-router-dom';
// import { Dashboard } from './Dashboard';

export const Notebook = (): JSX.Element => {
  // const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <header className="self-stretch flex flex-row justify-start gap-10">
        <Logo2 />
        <span className="text-discovery-a50 h4 font-['Nadoor'] font-bold italic tracking-normal py-14">
          W.E.B.U - Web Engineering of BackKhoa University
        </span>
      </header>
    </div>
  );
};

export default Notebook;
