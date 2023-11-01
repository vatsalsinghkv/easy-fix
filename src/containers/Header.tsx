import { Logo } from '@/components';
import { Button } from '@/components/Button';
import { useTheme } from '@/lib/hooks/use-theme';
import { Icon } from '@iconify-icon/react';
import { Moon, Sun } from 'lucide-react';
import { css } from 'styled-system/css';
import { container } from 'styled-system/patterns';

const Header = () => {
  const { isDarkMode, toggle } = useTheme();
  return (
    <header
      className={css({
        py: 1,
        borderBottomWidth: '1px',
        sm: { py: 5 },
        borderColor: 'dark-3',
      })}
    >
      <div
        className={container({
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: '8xl',
          mx: 'auto',
          px: 10,
        })}
      >
        <Logo />
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          })}
        >
          <a
            href='https://github.com/vatsalsinghkv/easy-fix'
            target='_blank'
            rel='noopener noreferrer'
            className={css({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              fontFamily: 'mono',
              fontSize: 'sm',
              lineHeight: 'tight',
              textTransform: 'capitalize',
              transition: 'all',
              borderWidth: '1px',
              rounded: 'sm',
              borderColor: 'slate.400',
              '&:hover': {
                bg: 'accent-light',
                borderColor: 'accent',
                color: 'accent',
              },
              '&:focus': {
                bg: 'accent-light',
                borderColor: 'accent',
                color: 'accent',
              },
              _peerChecked: {
                color: 'accent',
              },
            })}
          >
            <Icon icon='mdi:github' height={20} />
            Github
          </a>

          <Button
            onClick={toggle}
            className={css({
              p: 2,
              rounded: 'lg',
              borderWidth: 0,
              _hover: {
                bg: 'bg-secondary',
              },
            })}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
