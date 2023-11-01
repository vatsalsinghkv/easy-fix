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
    </Button>
  );
};

export default SortingTagFilter;
