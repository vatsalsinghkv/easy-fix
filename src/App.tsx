import { MiniContainer } from '@/components';
import { Filter, Issues } from '@/containers';
import { Footer, Header } from '@/containers/layout';

import BackToTopButton from './components/BackToTopButton';

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='container flex-grow py-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-[1.25fr_3fr]'>
          <aside className='space-y-5'>
            <MiniContainer title='about'>
              <p className='text-dark-2 leading-relaxed'>
                The perfect place to find{' '}
                <span className='text-accent font-bold'>easy-to-fix</span>{' '}
                issues. Our goal is to encourage people to start contributing to
                the{' '}
                <span className='gradient-text font-semibold'>open source</span>{' '}
                community! 🚀
              </p>
            </MiniContainer>
            <Filter />
          </aside>
          <Issues />
        </div>
      </main>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default App;
