import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Suggest } from '@/components/dashboard/Suggest';
import { MainNavigation } from '@/components/ui/MainNavigation';

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>
      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none gap-10">
        <div className="self-stretch flex-1 flex flex-row justify-center items-center py-1 gap-10">
          <div>
            <Suggest
              onExpandClick={() => {
                navigate('/problems');
              }}
              onReviewClick={() => {
                const cardId = '0';
                navigate(cardId ? '' : '/ide');
              }}
              title={'Suggested Problems'}
            />
          </div>
          <div>
            <Suggest
              onExpandClick={() => {
                navigate('/notebook');
              }}
              onReviewClick={() => {}}
              title="Your Notebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
