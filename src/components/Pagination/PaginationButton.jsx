import { Icon } from '@iconify-icon/react';

import { TOTAL_SIBLING_BUTTONS } from '../../utils/config';

// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
const PaginationButton = ({
  num = null,
  type,
  disable = false,
  totalPages,
  currentPage,
  onChange,
}) => {
  const selected = currentPage === num;

  const clickHandler = (e) => {
    if (disable) return;

    if (type) {
      if (type === 'prev') {
        onChange(currentPage - 1);
      } else if (type === 'next') {
        onChange(currentPage + 1);
      }
      return;
    }

    onChange(+e.target.id);
  };

  if (
    num === currentPage ||
    num === 1 ||
    num === 2 ||
    num === totalPages ||
    num === currentPage - TOTAL_SIBLING_BUTTONS ||
    num === currentPage + TOTAL_SIBLING_BUTTONS ||
    num === currentPage + TOTAL_SIBLING_BUTTONS + 1 ||
    type
  ) {
    if (
      (num > currentPage + TOTAL_SIBLING_BUTTONS && num < totalPages) ||
      (num === 2 && currentPage > 3)
    ) {
      return (
        <p className=''>
          <Icon icon='pepicons-pop:dots-x' />
        </p>
      );
    }
    return (
      <button
        className={`flex items-center justify-center h-8 w-8 md:h-9 md:w-9 font-mono text-sm border rounded ${
          selected
            ? 'bg-accent-light text-accent border-accent'
            : 'border-slate-400'
        } ${
          disable
            ? 'cursor-not-allowed opacity-50'
            : 'hover:text-accent focus:border-accent focus:text-accent hover:border-accent'
        }`}
        id={num}
        onClick={clickHandler}
      >
        {num}
      </button>
    );
  }
};

export default PaginationButton;
