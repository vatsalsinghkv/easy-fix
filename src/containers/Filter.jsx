import { Select } from '../components';
import useUrl from '../hooks/use-url';
import { LANGUAGES } from '../utils/config';
import { toId } from '../utils/helper';

const Filter = () => {
  const { language, setLanguage } = useUrl();
  const changeHandler = (e) => {
    setLanguage(e.target.id);
  };

  return (
    <div className='pt-5 space-y-5 md:border-r border-dark-3'>
      <h3 className='text-sm font-medium uppercase'>languages</h3>
      <form className='flex flex-wrap gap-3' onChange={changeHandler}>
        {LANGUAGES.sort().map((lang) => (
          <Select value={language} key={toId(lang)} name={lang} />
        ))}
      </form>
    </div>
  );
};

export default Filter;
