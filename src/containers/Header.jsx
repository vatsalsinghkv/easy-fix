import { Logo } from '@/components';
import { useState } from 'react';

const Header = () => {
  // Initialize darkMode state and set it to true by default
  const [darkMode, setDarkMode] = useState(true);

  // Function to toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`flex justify-around py-1 border-b sm:py-5 ${darkMode ? 'border-dark-3' : 'border-light-3'}`}>
      <Logo title='Easy Fix' className='container' />
      <div className='self-center'>
        <a href="https://github.com/vatsalsinghkv/easy-fix" target="_blank" rel="noopener noreferrer">
          <button className={`inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent ${darkMode ? 'border-slate-400' : 'border-white'}`}>
            View Github
          </button>
        </a>
        <button
          className={`ml-[10px] inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer ${darkMode ? 'border-slate-400' : 'border-white'} `}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
