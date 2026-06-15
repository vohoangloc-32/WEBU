import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo2 from '@/components/ui/Logo2';
import UserIcon from '@/components/ui/UserIcon';

export const TopNavigationSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { problemId } = useParams<{ problemId: string }>();

  // Format problem title
  const getProblemTitle = (id?: string) => {
    if (!id) return 'Two Sum';
    return id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Stopwatch state
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');
  };

  return (
    <header
      className="absolute top-0 left-0 w-[1440px] h-[120px] bg-tonal-a0 border-b border-tonal-a20 flex items-center justify-between px-8 select-none z-20"
      data-id="top-navigation-section"
    >
      {/* Left Area: Back, Logo, Breadcrumb */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => navigate('/problems')}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-tonal-a30 hover:border-secondary-a50 hover:bg-tonal-a20 text-neutral-a200 hover:text-white transition-all cursor-pointer"
          aria-label="Back to problems"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Small logo container */}
        <div
          className="h-16 w-20 overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="scale-65 origin-center">
            <Logo2 />
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-tonal-a30" />

        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <span
            onClick={() => navigate('/problems')}
            className="text-neutral-a400 hover:text-secondary-a50 cursor-pointer font-medium transition-colors"
          >
            Problems
          </span>
          <span className="text-neutral-a600">/</span>
          <span className="text-white font-bold text-base">
            {getProblemTitle(problemId)}
          </span>
        </nav>
      </div>

      {/* Center Area: Stopwatch Timer */}
      <div className="flex items-center gap-4 bg-tonal-a10 border border-tonal-a20 px-5 py-2.5 rounded-full shadow-inner">
        <svg
          className={`w-5 h-5 ${isRunning ? 'text-secondary-a70 animate-pulse' : 'text-neutral-a400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span className="text-white font-mono font-bold text-lg tracking-wider min-w-[70px]">
          {formatTime(seconds)}
        </span>

        <div className="flex items-center gap-1.5 ml-2 border-l border-tonal-a30 pl-3">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="text-neutral-a300 hover:text-white transition-colors cursor-pointer"
            title={isRunning ? 'Pause Timer' : 'Start Timer'}
          >
            {isRunning ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setSeconds(0);
              setIsRunning(false);
            }}
            className="text-neutral-a300 hover:text-danger-a10 transition-colors cursor-pointer ml-1"
            title="Reset Timer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Area: Status and Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-white font-semibold text-sm">John Doe</span>
          <span className="text-success-a0 text-xs font-bold">PRO Member</span>
        </div>
        <UserIcon />
      </div>
    </header>
  );
};

export default TopNavigationSection;
