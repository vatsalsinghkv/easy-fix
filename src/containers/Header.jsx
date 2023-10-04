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
<<<<<<< HEAD
    <header className={`py-1 border-b sm:py-5 ${darkMode ? 'border-dark-3' : 'border-light-3'}`}>
         <div className='container flex items-center justify-between'>
        <Logo title='Easy Fix' />
        <div>
          <a
            href='https://github.com/vatsalsinghkv/easy-fix'
            target='_blank'
            rel='noopener noreferrer'
          >
            <button
              className={`inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent ${
                darkMode ? 'border-slate-400' : 'border-white'
              }`}
            >
              View Github
            </button>
          </a>
          <button
            className={`ml-[10px] inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer ${
              darkMode ? 'border-slate-400' : 'border-white'
            } `}
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
=======
    <header className={`flex justify-around py-1 border-b sm:py-5 ${darkMode ? 'border-dark-3' : 'border-light-3'}`}>
      <Logo title='Easy Fix' className='container self-center my-auto' />
      <div className='self-center flex'>
        <a href="https://github.com/vatsalsinghkv/easy-fix" target="_blank" rel="noopener noreferrer">
          <button className={`inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border-none lg:border rounded  cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent ${darkMode ? 'border-slate-400' : 'border-white'} lg:flex`}>
            <i className="fab fa-github mr-2 fa-2x"></i>
            <span className='my-auto text-lg hidden lg:block'>Github</span>
          </button>
        </a>
        <button
          className={`ml-10 inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all rounded cursor-pointer ${darkMode ? '' : ''}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? <i className="fas fa-sun text-black fa-2x"></i> : <i className="fas fa-moon text-black fa-2x"></i>}
        </button>
>>>>>>> d50530e (updated the github logo code)
      </div>
    </header>
  );
};

export default Header;
