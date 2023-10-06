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
      <div className='self-center flex'>
      <a href="https://github.com/vatsalsinghkv/easy-fix" target="_blank" rel="noopener noreferrer">
      <button  className='flex self-center mr-[10px] inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400  2eer-checked:text-accent peer-checked:text-accent peer-checked:border-accent peer-checked:bg-accent-light sm:border-0 md:border-2'>
      <i className="fab fa-github mr-2 fa-2x"></i>
      <span className='my-auto text-lg hidden md:block'>Github</span>
    </button>
    </a>
      <button onClick={handleTheme} className=' w-[10vh] max-sm:translate-x-6'>
        {theme === 'dark' ? (
          <HiSun className='text-3xl ' />
        ) : (
          <HiMoon className='text-3xl ' />
        )}
      </button>
      </div>
    </div>
  );
};

export default Logo;
