import { Logo } from '@/components';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/hooks/use-theme';
import { Icon } from '@iconify-icon/react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggle } = useTheme();
  return (
    <header className={`py-1 border-b sm:py-5 border-dark-3`}>
      <div className='container flex justify-between items-center'>
        <Logo title='Easy Fix' />
        <div className='flex gap-4 justify-center items-center'>
          <Button as='link' href='https://github.com/vatsalsinghkv/easy-fix'>
            <Icon icon='mdi:github' height={20} />
            Github
          </Button>

          <button
            onClick={toggle}
            className='p-2 rounded-lg focus-visible:text-accent focus-visible:bg-bg-secondary hover:text-accent hover:bg-bg-secondary'
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
