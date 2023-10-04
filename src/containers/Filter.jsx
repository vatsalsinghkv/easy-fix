import { MiniContainer, Select } from '@/components';
import { useUrl } from '@/lib/hooks/use-url';
import { LANGUAGES, SORT_TAGS } from '@/lib/utils/config';
import { toId } from '@/lib/utils/helper';

const Filter = () => {
  const { language, setLanguage } = useUrl();
  const { sort, setSort } = useUrl();

  const changeHandler = (e) => {
    setLanguage(e.target.id);
  };
  const changeSortHandler = (e) => {
    setSort(e.target.id);
  };

  return (
    <>
      <MiniContainer title='languages'>
        <form className='flex flex-wrap gap-3 mt-4' onChange={changeHandler}>
          {LANGUAGES.sort().map((lang) => (
            <Select value={language} key={toId(lang)} name={lang} />
          ))}
        </form>
      </MiniContainer>

      <MiniContainer title='SORT'>
        <form
          className='flex flex-wrap gap-3 mt-4'
          onChange={changeSortHandler}
        >
          {SORT_TAGS.sort().map((tag) => (
            <Select value={sort} key={toId(tag)} name={tag} />
          ))}
        </form>
      </MiniContainer>
    </>
  );
};

export default Filter;
