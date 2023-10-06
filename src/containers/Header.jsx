import { Logo } from '@/components';
import { useTheme } from '@/lib/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggle } = useTheme();
  return (
    <header className={`py-1 border-b sm:py-5 border-dark-3`}>
      <div className='container flex items-center justify-between'>
        <Logo title='Easy Fix' />
        <button
          onClick={toggle}
          className='p-2 rounded-lg focus-visible:text-accent focus-visible:bg-bg-secondary hover:text-accent hover:bg-bg-secondary'
        >
          {isDarkMode ? <Moon className='' /> : <Sun className='' />}
        </button>
      </div>
    </header>
  );
};

export default Header;
