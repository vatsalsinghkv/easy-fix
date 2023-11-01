import { Ordering } from '@/models/Ordering';
import { SortingTag, getSortingTagLabel } from '@/models/SortingTag';
import { ArrowDownZAIcon, ArrowUpAZIcon } from 'lucide-react';
import { FC } from 'react';
import { css, cx } from 'styled-system/css';

import { Button } from './Button';

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

  return (
    <Button
      className={cx(
        'group',
        css({
          fontSize: 'xs',
          lineHeight: 'xs',
          position: 'relative',
          px: '3',
          py: '1.5',
          rounded: 'rounded',
          textTransform: 'capitalize',
        })
      )}
      selected={selected}
      onClick={onClick}
      size='sm'
      type='button'
    >
      <label className={css({ cursor: 'pointer' })}>{sortingTagLabel}</label>
      {selected ? (
        <>
          <span
            className={css({ color: 'accent', ml: '2', cursor: 'pointer' })}
          >
            {isOrderingDesc ? (
              <ArrowDownZAIcon size={18} aria-label='ordering-desc' />
            ) : (
              <ArrowUpAZIcon size={18} aria-label='ordering-asc' />
            )}
          </span>
          <span
            className={css({
              bgColor: 'gray.800',
              color: 'white',
              fontSize: 'xs',
              lineHeight: 'tight',
              p: 2,
              position: 'absolute',
              rounded: 'rounded',
              scale: 0,
              top: 10,
              transition: 'all',
              zIndex: 10,
              _groupHover: {
                scale: 1,
              },
            })}
          >
            Sorted by {sortingTagLabel} in {ordering}
          </span>
        </>
      ) : null}
    </Button>
  );
};

export default SortingTagFilter;
