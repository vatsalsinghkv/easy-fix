import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Label: React.FC<Props> = ({ children, className }) => {
  return (
    <span
      className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs font-mono font-semibold capitalize rounded-full text-accent bg-accent-light border border-accent/30 transition-all hover:border-accent hover:shadow-glow ${className}`}
    >
      {children}
    </span>
  );
};

export default Label;
