import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Tab from '@/components/ui/Tab';

interface SignProps {
  activeTab: 'signup' | 'signin';
  onActionClick?: () => void;
}

export const Sign = ({ activeTab, onActionClick }: SignProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <Button onClick={onActionClick} className="w-fit px-12">
        {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
      </Button>

      <nav
        aria-label="Authentication pages"
        className="flex items-center justify-center gap-4 mt-6"
      >
        <Tab
          isActive={activeTab === 'signup'}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Tab>

        <Tab
          isActive={activeTab === 'signin'}
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Tab>
      </nav>
    </div>
  );
};

export default Sign;
