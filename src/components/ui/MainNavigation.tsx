import { useNavigate, useLocation } from 'react-router-dom';
import Logo2 from '@/components/ui/Logo2';
import Tab from '@/components/ui/Tab';
import UserIcon from '@/components/ui/UserIcon';

export const MainNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from current URL pathname
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/problems')) return 'PROBLEM';
    if (path.startsWith('/notebook')) return 'NOTEBOOK';
    return 'DASHBOARD';
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-full bg-tonal-a10 rounded-[5px] inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
      <div className="self-stretch h-28 px-8 bg-tonal-a0 inline-flex flex-row justify-between items-center overflow-hidden">
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <Logo2 />
        </div>

        <div className="flex items-center gap-2 h-full">
          <Tab
            isActive={activeTab === 'DASHBOARD'}
            onClick={() => navigate('/dashboard')}
          >
            DASHBOARD
          </Tab>

          <Tab
            isActive={activeTab === 'PROBLEM'}
            onClick={() => navigate('/problems')}
          >
            PROBLEM
          </Tab>

          <Tab
            isActive={activeTab === 'NOTEBOOK'}
            onClick={() => navigate('/notebook')}
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
