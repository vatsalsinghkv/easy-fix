import { Ordering } from '@/models/Ordering';
import { SortingTag, getSortingTagLabel } from '@/models/SortingTag';
import { ArrowDownZAIcon, ArrowUpAZIcon } from 'lucide-react';
import { FC } from 'react';

type Props = {
  onClick: () => void;
  ordering: Ordering;
  selected: boolean;
  value: SortingTag;
};

export const SortingTagFilter: FC<Props> = ({
  onClick,
  ordering,
  selected,
  value,
}) => {
  const sortingTagLabel = getSortingTagLabel(value);
  const isOrderingDesc = ordering === 'desc';
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
              {isOrderingDesc ? (
                <ArrowDownZAIcon size={18} aria-label='ordering-desc' />
              ) : (
                <ArrowUpAZIcon size={18} aria-label='ordering-asc' />
              )}
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
