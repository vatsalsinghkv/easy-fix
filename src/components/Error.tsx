import React, { ReactNode } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';

interface Props {
  title: string;
  link?: {
    url: string;
    name: string;
  };
  children: ReactNode;
}

const Error: React.FC<Props> = ({ title, link, children }) => {
  const { isDarkMode } = useTheme();
  return (
    <main className='flex flex-col items-center justify-center gap-4 pt-10 pb-6 bg-base-100'>
      <div className='w-full max-w-md mx-auto '>
        <img
          src={isDarkMode ? '/crashed-error-dark.svg' : '/crashed-error-light.svg'}
          alt='error'
          className='relative z-10 w-full'
        />
      </div>
      <h1 className='mt-1 text-xl font-bold text-center md:text-3xl text-dark-1'>
        {title}
      </h1>
      <p className='max-w-lg text-center'>{children}</p>

      {link && (
        <a
          href={link.url}
          className='hidden px-6 py-3 text-sm font-semibold transition border rounded-full cursor-pointer md:block bg-neutral-100 hover:bg-neutral-50 hover:shadow-md'
          role='button'
        >
          {link.name}
        </a>
      )}
    </main>
  );
};

export default Error;
