import React, { ReactNode } from 'react';
import { css } from 'styled-system/css';

interface Props {
  title: string;
  link?: {
    url: string;
    name: string;
  };
  children: ReactNode;
}

const Error: React.FC<Props> = ({ title, link, children }) => {
  return (
    <main
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4',
        pt: '10',
        pb: '6',
      })}
    >
      <div className={css({ w: 'full', maxW: 'md', ml: 'auto', mr: 'auto' })}>
        <img
          src='/crashed-error.svg'
          alt='error'
          className={css({ pos: 'relative', zIndex: '10', w: 'full' })}
        />
      </div>
      <h1
        className={css({
          color: 'dark-1',
          fontSize: 'xl',
          fontWeight: 'bold',
          lineHeight: 'xl',
          mt: '1',
          textAlign: 'center',
          md: { fontSize: '3xl', lineHeight: '3xl' },
        })}
      >
        {title}
      </h1>
      <p className={css({ maxW: 'lg', textAlign: 'center' })}>{children}</p>

      {link && (
        <a
          href={link.url}
          className={css({
            bgColor: 'neutral.100',
            borderWidth: '1px',
            cursor: 'pointer',
            display: 'none',
            fontSize: 'sm',
            fontWeight: 'semibold',
            lineHeight: 'sm',
            py: '3',
            px: '6',
            rounded: 'full',
            transition: 'all',
            _hover: { bgColor: 'neutral.50', shadow: 'md' },
            md: { display: 'block' },
          })}
          role='button'
        >
          {link.name}
        </a>
      )}
    </main>
  );
};

export default Error;
