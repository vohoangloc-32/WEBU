import React, { useState } from 'react';
import Logo2 from '@/components/ui/Logo2';
import Tab from '@/components/ui/Tab';
import UserIcon from '@/components/ui/UserIcon';

type NavTab = 'DASHBOARD' | 'PROBLEM' | 'NOTEBOOK';

export const MainNavigation = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');

  return (
    <div className="w-370 p-5 bg-tonal-a10 rounded-[5px] border border-purple-600 inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
      <div className="self-stretch h-28 px-8 bg-tonal-a0 inline-flex flex-row justify-between items-center overflow-hidden">
        <div className="flex items-center justify-start">
          <Logo2 />
        </div>

        <div className="flex items-center gap-2 h-full">
          <Tab
            isActive={activeTab === 'DASHBOARD'}
            onClick={() => setActiveTab('DASHBOARD')}
          >
            DASHBOARD
          </Tab>

          <Tab
            isActive={activeTab === 'PROBLEM'}
            onClick={() => setActiveTab('PROBLEM')}
          >
            PROBLEM
          </Tab>

          <Tab
            isActive={activeTab === 'NOTEBOOK'}
            onClick={() => setActiveTab('NOTEBOOK')}
          >
            NOTEBOOK
          </Tab>
        </div>

        <div className="flex items-center justify-end">
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
