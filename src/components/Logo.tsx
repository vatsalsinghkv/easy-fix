import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'h1'> {
  title: string;
}

const Logo: React.FC<Props> = ({ title, className }) => {
  const [first, ...rest] = title.split(' ');

  return (
    <h1
      className={`text-3xl font-light leading-relaxed sm:text-4xl ${className}`}
    >
      <a href='/'>
        <span className='font-sans font-medium text-dark-1'>{first}</span>{' '}
        <span className='font-mono text-accent'>{rest.join(' ')}</span>
      </a>
    </h1>
  );
};

export default Logo;
