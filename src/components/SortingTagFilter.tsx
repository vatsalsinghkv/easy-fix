import { Ordering } from '@/models/Ordering';
import { SortingTag, getSortingTagLabel } from '@/models/SortingTag';
import { FC } from 'react';

import { ChartBarIcon } from './Icons';

type Props = {
  isSelected: boolean;
  onClick: () => void;
  ordering: Ordering;
  value: SortingTag;
};

export const SortingTagFilter: FC<Props> = ({
  isSelected,
  onClick,
  ordering,
  value,
}) => {
  const sortingTagLabel = getSortingTagLabel(value);
  const barIconClass = ordering === 'desc' ? ' scale-x-_-100 scale-y-100' : '';
  const activeClasses = isSelected
    ? ' text-accent border-accent bg-accent-light'
    : '';

  return (
    <>
      <button
        className={`cursor-pointer flex p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 relative group${activeClasses}`}
        onClick={onClick}
        type='button'
      >
        <label className='cursor-pointer'>{sortingTagLabel}</label>
        {isSelected ? (
          <>
            <span className='group text-accent ml-2 cursor-pointer'>
              <ChartBarIcon className={`h-4 w-4${barIconClass}`} />
            </span>
            <span className='absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-10'>
              Sorted by {sortingTagLabel} in {ordering}
            </span>
          </>
        ) : null}
      </button>
    </>
  );
};

export default SortingTagFilter;
