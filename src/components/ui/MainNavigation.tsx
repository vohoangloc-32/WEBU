import React, { useState, useEffect } from 'react';
import Logo2 from '@/components/ui/Logo2';
import Tab from '@/components/ui/Tab';
import UserIcon from '@/components/ui/UserIcon';
import { useNavigate, useLocation } from 'react-router-dom';

type NavTab = 'DASHBOARD' | 'PROBLEM' | 'NOTEBOOK';

export const MainNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes('/dashboard')) {
      setActiveTab('DASHBOARD');
    } else if (currentPath.includes('/problem')) {
      setActiveTab('PROBLEM');
    } else if (currentPath.includes('/notebook')) {
      setActiveTab('NOTEBOOK');
    }
  }, [location.pathname]);

  return (
    <div className="w-full bg-tonal-a10 rounded-[5px] inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
      <div className="self-stretch h-28 px-8 bg-tonal-a0 inline-flex flex-row justify-between items-center overflow-hidden">
        <div className="flex items-center justify-start">
          <Logo2 />
        </div>

        <div className="flex items-center gap-2 h-full">
          <Tab
            isActive={activeTab === 'DASHBOARD'}
            onClick={() => {
              setActiveTab('DASHBOARD');
              navigate('/dashboard');
            }}
          >
            DASHBOARD
          </Tab>

          <Tab
            isActive={activeTab === 'PROBLEM'}
            onClick={() => {
              setActiveTab('PROBLEM');
              navigate('/problem');
            }}
          >
            PROBLEM
          </Tab>

          <Tab
            isActive={activeTab === 'NOTEBOOK'}
            onClick={() => {
              setActiveTab('NOTEBOOK');
              navigate('/notebook');
            }}
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
