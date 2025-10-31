import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/lib/hooks/use-filter';
import { toId } from '@/lib/utils';
import { sortedLanguages } from '@/models/Language';
import { sortedSortingTags } from '@/models/SortingTag';

const Filter = () => {
  const {
    language,
    labelsSelected,
    labels,
    ordering,
    sortingTag,
    customLabel,
    customLabelHandler,
    languageChangeHandler,
    labelsToggleHandler,
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
                checked={labelsSelected.includes(l)}
                name={l}
                onChange={labelsToggleHandler(l)}
                inputType='checkbox'
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
          <Button
            as='input'
            size={'sm' as const}
            value={customLabel}
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomLabel(e.target.value);
            }}
            placeholder='+ add custom label'
            className='block bg-transparent'
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
