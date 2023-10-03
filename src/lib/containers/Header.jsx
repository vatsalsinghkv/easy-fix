import { Logo } from '@/lib/components';

const Header = () => {
  return (
    <header className='py-1 border-b sm:py-5 border-dark-3'>
      <Logo title='Easy Fix' classNme='container' />
    </header>
  );
};

export default Header;
