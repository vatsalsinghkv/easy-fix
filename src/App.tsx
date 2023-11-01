import { MiniContainer } from '@/components';
import { Filter, Footer, Header, Issues } from '@/containers';
import { css } from 'styled-system/css';
import { container } from 'styled-system/patterns';

const App = () => {
  return (
    <>
      <Header />
      <main
        className={container({
          maxWidth: '8xl',
          mx: 'auto',
          pr: 4,
          pl: 4,
          md: { pr: 4, pl: 4 },
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 1,
            gap: 4,
            md: { gridTemplateColumns: '1.25fr 3fr' },
          })}
        >
          <aside
            className={css({
              p: 2,
              md: {
                borderRightWidth: '1px',
                borderColor: 'dark-3',
              },
            })}
          >
            <MiniContainer title='about'>
              The perfect place to find{' '}
              <span className={css({ color: 'accent' })}>easy-to-fix</span>{' '}
              issues. Goal is to encourage people to start contributing to the
              open source community.
            </MiniContainer>
            <Filter />
          </aside>
          <Issues />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
