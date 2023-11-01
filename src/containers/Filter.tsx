import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { Language, sortedLanguages } from '@/models/Language';
import { SortingTag, sortedSortingTags } from '@/models/SortingTag';
import { useUrlValues } from '@/providers/urlProvider';
import { css } from 'styled-system/css';

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
      <MiniContainer className={css({ mt: 6 })} title='languages'>
        <ul
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 4,
          })}
        >
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
      <MiniContainer className={css({ mt: 6 })} title='sort'>
        <ul
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 4,
          })}
        >
          {sortedSortingTags.sort().map((tag) => (
            <li key={tag}>
              <SortingTagFilter
                onClick={onSortingTagClick(tag)}
                ordering={ordering}
                selected={tag === sortingTag}
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
