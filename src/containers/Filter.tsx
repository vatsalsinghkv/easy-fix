import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { useFilter } from '@/lib/hooks/use-filter';
import { toId } from '@/lib/utils';
import { sortedLanguages } from '@/models/Language';
import { sortedSortingTags } from '@/models/SortingTag';

const Filter = () => {
  const {
    language,
    label,
    labels,
    ordering,
    sortingTag,
    customLabel,
    customLabelHandler,
    languageChangeHandler,
    labelsChangeHandler,
    sortingTagClickHandler,
    setCustomLabel,
  } = useFilter();

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
                onChange={languageChangeHandler(lang)}
              />
            </li>
          ))}
        </ul>
      </MiniContainer>

      <MiniContainer title='labels'>
        <ul className='flex flex-wrap gap-3 mt-4'>
          {labels.map((l) => (
            <li key={toId(l)}>
              <Select
                value={l}
                checked={l === label}
                name={l}
                onChange={labelsChangeHandler(l)}
              />
            </li>
          ))}
        </ul>
        <form
          className='mt-2'
          onSubmit={(e) => {
            customLabelHandler(e);
          }}
        >
          <input
            value={customLabel}
            type='input'
            onChange={(e) => {
              setCustomLabel(e.target.value);
            }}
            placeholder='+ add custom label'
            className='block bg-bg-secondary/50 backdrop-blur-sm p-3 py-2 font-mono text-sm capitalize transition-all border-2 rounded-lg cursor-text hover:border-accent focus:border-accent focus:shadow-glow border-dark-3 focus:outline-none placeholder:text-dark-2'
          />
        </form>
      </MiniContainer>

      <MiniContainer title='sort'>
        <ul className='flex flex-wrap gap-3 mt-4'>
          {sortedSortingTags.sort().map((tag) => (
            <li key={tag}>
              <SortingTagFilter
                isSelected={tag === sortingTag}
                onClick={sortingTagClickHandler(tag)}
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
