import { Filter, Header, Issues } from './containers';

const App = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-[1.25fr_3fr]'>
          <Filter />
          <Issues />
        </div>
      </main>
    </>
  );
};

export default App;
