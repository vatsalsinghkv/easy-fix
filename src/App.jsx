import { Header, Issues } from './containers';

const App = () => {
  return (
    <>
      <Header />
      <main className='container'>
        {/* Filter (Aside) */}
        {/* Issues */}
        <Issues />
        {/* Pagination */}
      </main>
    </>
  );
};

export default App;
