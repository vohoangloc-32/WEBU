import React from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
// import { Button } from '@/components/ui/Button';
// import { useNavigate } from 'react-router-dom';
// import { Dashboard } from './Notebook';

export const Problem = (): JSX.Element => {
  // const navigate = useNavigate();

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>
    </div>
  );
};

export default Problem;
