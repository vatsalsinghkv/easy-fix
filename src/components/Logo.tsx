import React from 'react';

interface Props {
  title: string;
  classNme: string;
}

const Logo: React.FC<Props> = ({ title, classNme }) => {
  const [first, ...rest] = title.split(' ');

  return (
    <h1
      className={`text-3xl font-light leading-relaxed sm:text-4xl ${classNme}`}
    >
      <a href='/'>
        <span className='font-sans font-medium text-dark-1'>{first}</span>{' '}
        <span className='font-mono text-accent'>{rest.join(' ')}</span>
      </a>
    </h1>
  );
};

export default Logo;
