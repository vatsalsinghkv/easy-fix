import { ChangeEvent, FC } from 'react';
import { css, cx } from 'styled-system/css';

type Props = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Select: FC<Props> = ({ name, value, onChange, checked }) => {
  return (
    <>
      <input
        checked={checked}
        className={cx('peer', css({ display: 'inline', appearance: 'none' }))}
        type='radio'
        name={name}
        onChange={onChange}
        id={name}
        value={value}
      />
      <label
        className={css({
          borderColor: 'slate.400',
          borderWidth: '1px',
          cursor: 'pointer',
          display: 'block',
          fontFamily: 'mono',
          fontSize: 'xs',
          lineHeight: 'tight',
          px: 3,
          py: 1.5,
          rounded: 'md',
          textTransform: 'capitalize',
          transition: 'all',
          _focus: {
            borderColor: 'accent',
            color: 'accent',
          },
          _hover: {
            borderColor: 'accent',
            color: 'accent',
          },
          _peerChecked: {
            borderColor: 'slate.400',
            color: 'accent',
            bg: 'accent-light',
          },
          _peerFocus: {
            borderColor: 'accent',
            color: 'accent',
            ring: 'none',
            ringOffset: 'none',
          },
          _peerHover: {
            borderColor: 'accent',
          },
        })}
        htmlFor={name}
      >
        {name}
      </label>
    </>
  );
};

export default Select;
