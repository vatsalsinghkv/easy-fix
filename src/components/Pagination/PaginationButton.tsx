import { Icon } from '@iconify-icon/react';
import { FC, MouseEvent, useMemo } from 'react';
import { css } from 'styled-system/css';

import { Button } from '../Button';

interface Props {
  item?: { label: number; isClickable?: boolean };
  type?: 'prev' | 'next';
  icon?: React.ReactNode;
  disabled?: boolean;
  currentPage: number;
  onChange: (newPage: number) => void;
}

const PaginationButton: FC<Props> = ({
  item,
  type,
  icon = null,
  disabled = false,
  currentPage,
  onChange,
}) => {
  const selected = useMemo(() => {
    if (type) return false;
    if (!item) return false;

    return currentPage === item.label;
  }, [currentPage, type, item]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!type) {
      onChange(+e.currentTarget.id);
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
      <Button
        selected={selected}
        disabled={disabled}
        id={type || (item && String(item.label))}
        aria-label={type || (item && String(item.label))}
        size='sm'
        className={css({ p: type ? '0.25rem' : undefined })}
        onClick={clickHandler}
      >
        {type ? icon : item?.label}
      </Button>
    );
  }

  return (
    <p>
      <Icon icon='pepicons-pop:dots-x' />
    </p>
  );
};

export default PaginationButton;
