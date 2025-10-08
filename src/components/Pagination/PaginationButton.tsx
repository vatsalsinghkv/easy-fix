import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify-icon/react';
import { FC, MouseEvent, useMemo } from 'react';

// scroll to top while navigating through web-pages
function scroll() {
  if (window.innerWidth <= 430 && window.innerWidth >= 330) {
    window.scrollTo({ top: 730, behavior: 'smooth' });
  } else if (window.innerWidth <= 330) {
    window.scrollTo({ top: 830, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

interface Props {
  item?: { label: number; isClickable?: boolean };
  type?: 'prev' | 'next';
  icon?: React.ReactNode;
  disable?: boolean;
  currentPage: number;
  onChange: (newPage: number) => void;
}

const PaginationButton: FC<Props> = ({
  item,
  type,
  icon = null,
  disable = false,
  currentPage,
  onChange,
}) => {
  const selected = useMemo(() => {
    if (type) return false;
    if (!item) return false;

    return currentPage === item.label;
  }, [currentPage, type, item]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (disable) return;
    if (!type) {
      onChange(+e.currentTarget.id);
      scroll();

      return;
    }
    if (type === 'prev') {
      onChange(currentPage - 1);
      scroll();
    } else if (type === 'next') {
      onChange(currentPage + 1);
      scroll();
    }
  };

  if (!item && !type) return null;

  if (item?.isClickable || type) {
    return (
      <Button
        size='icon'
        className={cn(selected && 'bg-accent-light text-accent border-accent')}
        id={type || (item && String(item.label))}
        aria-label={type || (item && String(item.label))}
        onClick={clickHandler}
      >
        {type ? icon : item?.label}
      </Button>
    );
  }

  return (
    <p className=''>
      <Icon icon='pepicons-pop:dots-x' />
    </p>
  );
};

export default PaginationButton;
