import { Logo } from '@/components';
import { useTheme } from '@/lib/hooks/use-theme';
import { Icon } from '@iconify-icon/react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggle } = useTheme();
  return (
    <header className={`py-1 border-b sm:py-5 border-dark-3`}>
      <div className='container flex items-center justify-between'>
        <Logo title='Easy Fix' />
        <div className='flex items-center justify-center gap-4'>
          <a
            href='https://github.com/vatsalsinghkv/easy-fix'
            target='_blank'
            rel='noopener noreferrer'
            className='flex  justify-center items-center gap-2 p-3 py-1.5 font-mono text-sm capitalize transition-all border rounded  hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 peer-checked:text-accent hover:bg-accent-light focus:bg-accent-light'
          >
            <Icon icon='mdi:github' height={20} />
            Github
          </a>

          <button
            onClick={toggle}
            className='p-2 rounded-lg focus-visible:text-accent focus-visible:bg-bg-secondary hover:text-accent hover:bg-bg-secondary'
          >
            {isDarkMode ? <Moon className='' /> : <Sun className='' />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
