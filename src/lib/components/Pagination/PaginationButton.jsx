import { Icon } from '@iconify-icon/react';
import { useMemo } from 'react';

// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
const PaginationButton = ({
  item,
  type,
  icon = null,
  disable = false,
  currentPage,
  onChange,
}) => {
  /**
   * True if the button is the current page.
   */
  const selected = useMemo(() => {
    if (type) return false;
    if (!item) return false;

    return currentPage === item.label;
  }, [currentPage, type, item]);

/**
 * Updates the current page based on the type of button clicked.
 */
  const clickHandler = (e) => {
    if (disable) return;
    if (!type) {
      onChange(+e.target.id);
      return;
    }
    if (type === 'prev') {
      onChange(currentPage - 1);
    } else if (type === 'next') {
      onChange(currentPage + 1);
    }
  };

  if (!item && !type) return null;

  if (item?.isClickable || type) {
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
        id={type || item.label}
        onClick={clickHandler}
      >
        {type ? icon : item?.label}
      </button>
    );
  }

  return (
    <p className=''>
      <Icon icon='pepicons-pop:dots-x' />
    </p>
  );
};

export default PaginationButton;
