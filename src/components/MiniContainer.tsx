import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  className?: string;
}

const MiniContainer: React.FC<Props> = ({ children, title }) => {
  return (
    <div className='space-y-3 p-4 rounded-lg border border-dark-3 bg-bg-secondary/30 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-glow/50'>
      <h3 className='heading-tertiary text-accent font-bold tracking-wider'>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default MiniContainer;
