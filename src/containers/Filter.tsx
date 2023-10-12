import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { Language, sortedLanguages } from '@/models/Language';
import { SortingTag, sortedSortingTags } from '@/models/SortingTag';
import { useUrlValues } from '@/providers/urlProvider';

const Filter = () => {
  const { dispatch, language, ordering, sortingTag, labels } = useUrlValues();

  const onLanguageChange = (payload: Language) => {
    return () => dispatch({ type: 'update-language', payload });
  };

  const onLabelChange = (payload: string) => {
    const labels = payload.split(',').map((label) => label.trim());
    return () => dispatch({ type: 'update-labels', payload:labels });
  }

  const onSortingTagClick = (payload: SortingTag) => {
    return () => dispatch({ type: 'update-sorting-tag', payload });
  };

  return (
    <>
      <MiniContainer title='languages'>
        <ul className='flex flex-wrap gap-3 mt-4'>
          {sortedLanguages.map((lang) => (
            <li key={lang}>
              <Select
                checked={lang === language}
                name={lang}
                onChange={onLanguageChange(lang)}
                value={lang}
              />
            </li>
          ))}
        </ul>
      </MiniContainer>

      <MiniContainer title='sort'>
        <ul className='flex flex-wrap gap-3 mt-4'>
          {sortedSortingTags.sort().map((tag) => (
            <li key={tag}>
              <SortingTagFilter
                isSelected={tag === sortingTag}
                onClick={onSortingTagClick(tag)}
                ordering={ordering}
                value={tag}
              />
            </li>
          ))}
        </ul>
      </MiniContainer>
      <MiniContainer title='labels'>
        <input
          className='w-full p-2 border border-gray-300 rounded-md'
          type='text'
          placeholder='Enter labels'
          value={labels.join(',')}
          onChange={(e) => onLabelChange(e.target.value)()}
        />
      </MiniContainer>
    </>
  );
};

export default Filter;
