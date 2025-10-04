import PaginationButton from '@/components/Pagination/PaginationButton';
import { TOTAL_SIBLING_BUTTONS } from '@/lib/utils/config';
import { Icon } from '@iconify-icon/react';
import React, { useMemo } from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage, onChange }) => {
  const items = useMemo(() => {
    const startIdx =
      currentPage - TOTAL_SIBLING_BUTTONS < 1
        ? 1
        : currentPage - TOTAL_SIBLING_BUTTONS;
    const endIdx =
      currentPage + TOTAL_SIBLING_BUTTONS > totalPages
        ? totalPages
        : currentPage + TOTAL_SIBLING_BUTTONS;
    const arr = [];

    for (let i = startIdx; i <= endIdx; i++) {
      arr.push({ label: i, isClickable: true });
    }

    const lastItemLabel = arr[arr.length - 1]?.label;
    if (lastItemLabel && lastItemLabel + 1 < totalPages)
      arr.push({ label: lastItemLabel + 1, isClickable: false });
    const firstItemLabel = arr[0]?.label;
    if (firstItemLabel && firstItemLabel - 1 > 1)
      arr.unshift({ label: firstItemLabel - 1, isClickable: false });

    if (!arr.some(({ label }) => label === 1))
      arr.unshift({ label: 1, isClickable: true });

    if (!arr.some(({ label }) => label === totalPages))
      arr.push({ label: totalPages, isClickable: true });

    return arr;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-center gap-3 py-3 mb-5'>
      <PaginationButton
        onChange={onChange}
        currentPage={currentPage}
        type='prev'
        icon={<Icon height={24} width={24} icon='ic:sharp-chevron-left' />}
        disable={currentPage === 1}
      />
      {items.map((item) => (
        <PaginationButton
          item={item}
          onChange={onChange}
          key={item.label}
          currentPage={currentPage}
        />
      ))}
      <PaginationButton
        onChange={onChange}
        currentPage={currentPage}
        type='next'
        icon={<Icon height={24} width={24} icon='ic:sharp-chevron-right' />}
        disable={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
