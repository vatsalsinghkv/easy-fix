import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { toId } from '@/lib/utils';
import { Label, sortedLabels } from '@/models/Label';
import { Language, sortedLanguages } from '@/models/Language';
import { SortingTag, sortedSortingTags } from '@/models/SortingTag';
import { useUrlValues } from '@/providers/urlProvider';

const Filter = () => {
  const { dispatch, language, ordering, sortingTag, label } = useUrlValues();

  const onLanguageChange = (payload: Language) => {
    return () => dispatch({ type: 'update-language', payload });
  };

  const onLabelChange = (payload: Label) => {
    return () => dispatch({ type: 'update-label', payload });
  };

  const onSortingTagClick = (payload: SortingTag) => {
    return () => dispatch({ type: 'update-sorting-tag', payload });
  };

  return (
    <>
      <MiniContainer title='languages'>
        <ul className='flex flex-wrap gap-3 mt-4'>
          {sortedLanguages.map((lang) => (
            <li key={toId(lang)}>
              <Select
                value={lang}
                checked={lang === language}
                name={lang}
                onChange={onLanguageChange(lang)}
              />
            </li>
          ))}
        </ul>
      </MiniContainer>

      <MiniContainer title='labels'>
        <ul className='flex flex-wrap gap-3 mt-4'>
          {sortedLabels.map((l) => (
            <li key={toId(l)}>
              <Select
                value={l}
                checked={l === label}
                name={l}
                onChange={onLabelChange(l)}
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
    </>
  );
};

export default Filter;
