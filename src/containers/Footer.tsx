import { css } from 'styled-system/css';

const Footer = () => {
  return (
    <footer
      className={css({
        borderColor: 'dark-3',
        borderTopWidth: '1px',
        color: 'dark-2',
        fontFamily: 'mono',
        fontSize: 'xs',
        lineHeight: 'xs',
        p: '5',
        textAlign: 'center',
        md: { p: '8' },
      })}
    >
      <a
        href='https://github.com/vatsalsinghkv/easy-fix'
        target='_blank'
        rel='noreferrer'
        className={css({
          transition: 'all',
          _focus: { color: 'accent' },
          _hover: { color: 'accent' },
        })}
      >
        Design &amp; Built by Vatsal Singh
      </a>
    </footer>
  );
};

export default Footer;
