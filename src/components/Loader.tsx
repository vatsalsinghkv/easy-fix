import React from 'react';

const Loader: React.FC = () => {
  return (
    <div
      className='inline-block h-14 w-14 animate-spin text-accent rounded-full border-4 border-solid border-current border-r-dark-3 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'
    ></div>
  );
};

export default Loader;
