import { css, cx } from 'styled-system/css';

const Logo = () => {
  return (
    <h1
      className={cx(
        css({
          fontSize: '3xl',
          lineHeight: 'tight',
          fontWeight: 'light',
          sm: { fontSize: '4xl', lineHeight: '4xl' },
        })
      )}
    >
      <a href='/'>
        <span
          className={css({
            color: 'dark-1',
            fontFamily: 'sans',
            fontWeight: 'medium',
          })}
        >
          Easy
        </span>{' '}
        <span className={css({ color: 'accent', fontFamily: 'mono' })}>
          Fix
        </span>
      </a>
    </h1>
  );
};

export default Logo;
