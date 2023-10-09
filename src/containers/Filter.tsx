import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { Language, sortedLanguages } from '@/models/Language';
import { SortingTag, sortedSortingTags } from '@/models/SortingTag';
import { useUrlValues } from '@/providers/urlProvider';

const Filter = () => {
  const { dispatch, language, ordering, sortingTag } = useUrlValues();

  const onLanguageChange = (payload: Language) => {
    return () => dispatch({ type: 'update-language', payload });
  };

  const onSortingTagClick = (payload: SortingTag) => {
    return () => dispatch({ type: 'update-sorting-tag', payload });
  };

  return (
    <>
      <MiniContainer title='languages'>
        <form className='flex flex-wrap gap-3 mt-4'>
          {sortedLanguages.map((lang) => (
            <Select
              checked={lang === language}
              key={lang}
              name={lang}
              onChange={onLanguageChange(lang)}
              value={lang}
            />
          ))}
        </form>
      </MiniContainer>

      <MiniContainer title='sort'>
        <form className='flex flex-wrap gap-3 mt-4'>
          {sortedSortingTags.sort().map((tag) => (
            <SortingTagFilter
              isSelected={tag === sortingTag}
              key={tag}
              onClick={onSortingTagClick(tag)}
              ordering={ordering}
              value={tag}
            />
          ))}
        </form>
      </MiniContainer>
    </>
  );
};

export default Filter;
