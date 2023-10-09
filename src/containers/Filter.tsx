import { MiniContainer, Select, SortBy } from '@/components';
import { useUrl } from '@/lib/hooks/use-url';
import { sortedLanguages } from '@/models/Language';
import { sortedTags } from '@/models/Tag';
import { ChangeEventHandler } from 'react';

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
          {sortedLanguages.map((lang) => (
            <Select
              value={language}
              key={lang}
              name={lang}
              onChange={onLanguageChange}
            />
          ))}
        </form>
      </MiniContainer>

      <MiniContainer title='sort'>
        <form className='flex flex-wrap gap-3 mt-4'>
          {sortedTags.sort().map((tag) => (
            <SortBy
              value={sort}
              key={tag}
              name={tag}
              order={getSortOrder(order)}
              setOrder={changeSortOrderHandler}
              onSortChange={changeSortHandler}
            />
          ))}
        </form>
      </MiniContainer>
    </>
  );
};

export default Filter;
