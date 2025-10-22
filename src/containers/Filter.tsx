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
            className='block bg-transparent p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-dark-2 peer-hover:border-accent peer-focus:border-accent peer-focus:text-accent peer-checked:text-accent peer-checked:border-accent peer-checked:bg-accent-light peer-focus:outline-none'
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
