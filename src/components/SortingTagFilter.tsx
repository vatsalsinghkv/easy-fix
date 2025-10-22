import { Ordering } from '@/models/Ordering';
import { SortingTag, getSortingTagLabel } from '@/models/SortingTag';
import { ArrowDownZAIcon, ArrowUpAZIcon } from 'lucide-react';
import { FC } from 'react';

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
  const isOrderingDesc = ordering === 'desc';
  const activeClasses = isSelected
    ? ' text-accent !border-accent bg-accent-light'
    : '';

  return (
    <>
      <button
        className={`cursor-pointer flex p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-dark-2 relative  ${activeClasses}`}
        onClick={onClick}
        type='button'
      >
        <label className='cursor-pointer'>{sortingTagLabel}</label>
        {isSelected ? (
          <>
            <span className='ml-2 cursor-pointer group text-accent'>
              {isOrderingDesc ? (
                <ArrowDownZAIcon size={18} aria-label='ordering-desc' />
              ) : (
                <ArrowUpAZIcon size={18} aria-label='ordering-asc' />
              )}
            </span>
            <span className='absolute z-10 p-2 text-xs text-white transition-all scale-0 bg-gray-800 rounded top-10 group-hover:scale-100'>
              Sorted by {sortingTagLabel} in {ordering}
            </span>
          </>
        ) : null}
      </button>
    </>
  );
};

export default SortingTagFilter;
