import { ComponentProps, PropsWithChildren } from 'react';
import { css, cx } from 'styled-system/css';

type Props = PropsWithChildren<ComponentProps<'span'>>;

const Label = ({ children, className }: Props) => {
  return (
    <span
      className={cx(
        css({
          alignItems: 'center',
          bg: 'accent-light',
          color: 'accent',
          display: 'inline-flex',
          fontFamily: 'mono',
          fontSize: 'xs',
          fontWeight: 'medium',
          lineHeight: 'tight',
          px: '2.5',
          py: '1',
          rounded: 'full',
          textTransform: 'capitalize',
          md: { px: '3', py: '1.5' },
        }),
        className
      )}
    >
      {children}
    </span>
  );
};

export default Label;
