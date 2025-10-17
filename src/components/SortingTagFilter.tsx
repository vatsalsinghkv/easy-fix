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
    ? ' text-bg !border-accent bg-accent shadow-glow'
    : '';

  return (
    <>
      <button
        className={`cursor-pointer flex px-4 py-2 font-mono text-sm font-semibold capitalize transition-all border-2 rounded-lg hover:text-accent hover:border-accent hover:shadow-glow hover:scale-105 focus:text-accent focus:border-accent focus:shadow-glow border-dark-3 relative ${activeClasses}`}
        onClick={onClick}
        type='button'
      >
        <label className='cursor-pointer'>{sortingTagLabel}</label>
        {isSelected ? (
          <>
            <span className='ml-2 cursor-pointer group'>
              {isOrderingDesc ? (
                <ArrowDownZAIcon size={18} aria-label='ordering-desc' />
              ) : (
                <ArrowUpAZIcon size={18} aria-label='ordering-asc' />
              )}
            </span>
            <span className='absolute z-10 px-3 py-2 text-xs font-medium text-white transition-all scale-0 bg-gradient-hacktober border border-accent rounded-lg top-12 group-hover:scale-100 shadow-glow whitespace-nowrap'>
              Sorted by {sortingTagLabel} in {ordering}
            </span>
          </>
        ) : null}
      </button>
    </>
  );
};

export default SortingTagFilter;
