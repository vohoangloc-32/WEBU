import React from 'react';

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const Tab = ({
  children,
  isActive = false,
  className = '',
  ...props
}: TabProps): JSX.Element => {
  const baseClasses =
    "px-5 py-5 inline-flex justify-center items-center gap-2 overflow-hidden text-center text-2xl font-bold font-['SFU_Futura'] transition-all duration-200 select-none cursor-pointer";

  const stateClasses = isActive
    ? 'text-secondary-a30 bg-transparent hover:bg-info-a10 rounded-t-xl border-b-[6px] border-secondary-a50'
    : 'text-neutral-a100 bg-transparent hover:bg-info-a20 hover:text-neutral-a50 rounded-xl border-b-[6px] border-transparent hover:border-transparent';

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Tab;
