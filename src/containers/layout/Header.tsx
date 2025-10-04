import { Logo } from '@/components';
import { useTheme } from '@/lib/hooks/use-theme';
import { Icon } from '@iconify-icon/react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggle } = useTheme();
  return (
    <header
      className={`py-1 border-b sm:py-5 border-dark-3 backdrop-blur-sm bg-bg/80`}
    >
      <div className='container flex items-center justify-between'>
        <Logo title='Easy Fix' />
        <div className='flex items-center justify-center gap-4'>
          <a
            href='https://github.com/vatsalsinghkv/easy-fix'
            target='_blank'
            rel='noopener noreferrer'
            className='flex justify-center items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold capitalize transition-all border-2 rounded-lg hover:text-bg hover:bg-accent focus:text-bg focus:bg-accent border-accent hover:shadow-glow focus:shadow-glow hover:scale-105 active:scale-95'
          >
            <Icon icon='mdi:github' height={22} />
            Github
          </a>

          <button
            onClick={toggle}
            className='p-2.5 rounded-lg border-2 border-transparent transition-all focus-visible:text-accent-secondary focus-visible:border-accent-secondary hover:text-accent-secondary hover:border-accent-secondary hover:shadow-glow-pink'
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
