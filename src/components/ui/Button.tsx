import React, { useState } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isProcessing?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isProcessing = false,
  disabled,
  className = '',
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isEffectiveDisabled = disabled || isProcessing;

  let stateWrapperClass = '';
  let stateTextClass = '';

  if (isProcessing) {
    stateWrapperClass =
      'bg-info-a0 border-primary-a0 border-dashed cursor-not-allowed';
    stateTextClass = 'text-secondary-a30';
  } else if (isHovered) {
    stateWrapperClass = 'bg-info-a20 border-primary-a20 cursor-pointer';
    stateTextClass = 'text-secondary-a10';
  } else {
    stateWrapperClass = 'bg-tonal-a20 border-secondary-a70 cursor-pointer';
    stateTextClass = 'text-secondary-a70';
  }

  const commonWrapperClass =
    'flex items-center justify-center gap-2.5 p-2.5 relative w-full flex-[0_0_auto] rounded-[10px] border border-solid transition-all duration-200';
  const finalTextClass = `relative w-fit mt-[-1.00px] h2 ${stateTextClass}`;

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEffectiveDisabled) {
      setIsHovered(true);
    }
    if (onMouseEnter) {
      onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEffectiveDisabled) {
      setIsHovered(false);
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  };

  return (
    <button
      type="button"
      className={`${commonWrapperClass} ${stateWrapperClass} ${className}`.trim()}
      disabled={isEffectiveDisabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={finalTextClass}>{children}</span>
    </button>
  );
};
