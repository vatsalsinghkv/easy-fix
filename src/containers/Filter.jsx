import { LANGUAGES, SORT_TAGS } from '@/lib/utils/config';
import { MiniContainer, Select, SortBy } from '@/components';

import { toId } from '@/lib/utils/helper';
import { useUrl } from '@/lib/hooks/use-url';

const Filter = () => {
  const { language, setLanguage, sort, setSort, order, setOrder } = useUrl();

  const getSortOrder = (order) => (order === 'asc' ? 'desc' : 'asc');

  const changeHandler = (e) => {
    setLanguage(e.target.id);
  };
  const changeSortHandler = (e) => {
    setSort(e);
  };

  const changeSortOrderHandler = (e) => {
    setSort(e);
    setOrder(getSortOrder(order));
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
        >
          {SORT_TAGS.sort().map((tag) => (
            <SortBy value={sort} key={toId(tag)} name={tag} order={getSortOrder(order)} setOrder={changeSortOrderHandler} onSortChange={changeSortHandler} />
          ))}
        </form>
      </MiniContainer>
    </>
  );
};

export default Filter;
