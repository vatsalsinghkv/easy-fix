import React, { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-mono font-medium capitalize rounded-full text-accent bg-accent-light  ${className}`}
    >
      {children}
    </span>
  );
};

export default Label;
