import { MiniContainer, Select } from '../components';
import useUrl from '../hooks/use-url';
import { LANGUAGES } from '../utils/config';
import { toId } from '../utils/helper';

const Filter = () => {
  const { language, setLanguage } = useUrl();
  const changeHandler = (e) => {
    setLanguage(e.target.id);
  };

  return (
    <MiniContainer title='languages'>
      <form className='flex flex-wrap gap-3 mt-4' onChange={changeHandler}>
        {LANGUAGES.sort().map((lang) => (
          <Select value={language} key={toId(lang)} name={lang} />
        ))}
      </form>
    </MiniContainer>
  );
};

export default Filter;
