import { LANGUAGES, SORT_TAGS } from '@/lib/utils/config';
import { MiniContainer, Select, SortBy } from '@/components';

import { ChangeEventHandler } from 'react';
import { toId } from '@/lib/utils/helper';
import { useUrl } from '@/lib/hooks/use-url';

const Filter = () => {
  const { language, setLanguage, sort, setSort, order, setOrder } = useUrl();
  
  const getSortOrder = (order: string) => (order === 'asc' ? 'desc' : 'asc');

  const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.currentTarget;

    if (!target.id) {
      console.warn('[onLanguageChange] target.id is missing');
      return;
    }

    setLanguage(target.id);
  };

  const changeSortHandler = (e: string) => {
    setSort(e);
  };

  const changeSortOrderHandler = (e: string) => {
    setSort(e);
    setOrder(getSortOrder(order));
  };

  return (
    <>
      <MiniContainer title='languages'>
        <form className='flex flex-wrap gap-3 mt-4'>
          {LANGUAGES.sort().map((lang) => (
            <Select
              value={language}
              key={toId(lang)}
              name={lang}
              onChange={onLanguageChange}
            />
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
