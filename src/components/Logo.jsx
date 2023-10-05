import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const Logo = ({ title, classNme }) => {
  const [first, ...rest] = title.split(' ');

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex justify-evenly w-full'>
      <h1
        className={`text-3xl font-light leading-relaxed sm:text-4xl ${classNme} w-[90vh] max-sm:max-sm:translate-x-3`}
      >
        <a href='/'>
          <span className='font-sans font-medium text-dark-1'>{first}</span>{' '}
          <span className='font-mono text-accent'>{rest.join(' ')}</span>
        </a>
      </h1>

      <button onClick={handleTheme} className=' w-[10vh] max-sm:translate-x-6'>
        {theme === 'dark' ? (
          <HiSun className='text-3xl ' />
        ) : (
          <HiMoon className='text-3xl ' />
        )}
      </button>
    </div>
  );
};

export default Logo;
