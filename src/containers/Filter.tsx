import { MiniContainer, Select } from '@/components';
import SortingTagFilter from '@/components/SortingTagFilter';
import { toId } from '@/lib/utils';
import { Label, sortedLabels } from '@/models/Label';
import { Language, sortedLanguages } from '@/models/Language';
import { SortingTag, sortedSortingTags } from '@/models/SortingTag';
import { useUrlValues } from '@/providers/urlProvider';
import { FormEvent, useState } from 'react';

const Filter = () => {
  const [customLabel, setCustomLabel] = useState("");

  const [labels, setLabels] = useState(sortedLabels);

  const customLabelHandler = (e: FormEvent) => {
    e.preventDefault();
    setLabels([...labels, customLabel]);
    onLabelChange(customLabel);
    setCustomLabel("");
  }

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
          {labels.map((l) => (
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
        <form className='mt-2' onSubmit={(e) => { customLabelHandler(e) }}>
          <input
            value={customLabel}
            type='input'
            onChange={(e) => { setCustomLabel(e.target.value) }}
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
