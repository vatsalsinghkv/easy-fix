import { MiniContainer, Select } from '@/components';
import { useUrl } from '@/lib/hooks/use-url';
import { LANGUAGES, SORT_TAGS } from '@/lib/utils/config';
import { toId } from '@/lib/utils/helper';
import { ChangeEventHandler } from 'react';

const Filter = () => {
  const { language, setLanguage, sort, setSort } = useUrl();

  const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.currentTarget;

    if (!target.id) {
      console.warn('[onLanguageChange] target.id is missing');
      return;
    }

    setLanguage(target.id);
  };
  const onSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.currentTarget;

    if (!target.id) {
      console.warn('[onSortChange] target.id is missing');
      return;
    }

    setSort(target.id);
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
        <form className='flex flex-wrap gap-3 mt-4'>
          {SORT_TAGS.sort().map((tag) => (
            <Select
              value={sort}
              key={toId(tag)}
              name={tag}
              onChange={onSortChange}
            />
          ))}
        </form>
      </MiniContainer>
    </>
  );
};

export default Filter;
