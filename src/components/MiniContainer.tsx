import React, { ReactNode } from 'react';

interface MiniContainerProps {
  children: ReactNode;
  title: string;
  className?: string;
}

const MiniContainer: React.FC<MiniContainerProps> = ({ children, title }) => {
  return (
    <div className='space-y-2'>
      <h3 className='heading-tertiary'>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default MiniContainer;
