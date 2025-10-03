import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'h1'> {
  title: string;
}

const Logo: React.FC<Props> = ({ title, className }) => {
  const [first, ...rest] = title.split(' ');

  return (
    <h1
      className={`text-3xl font-bold leading-relaxed sm:text-4xl transition-all hover:scale-105 ${className}`}
    >
      <a href='/' className='flex items-center gap-2'>
        <span className='font-sans font-bold text-dark-1'>{first}</span>{' '}
        <span className='font-mono font-extrabold gradient-text'>
          {rest.join(' ')}
        </span>
      </a>
    </h1>
  );
};

export default Logo;
