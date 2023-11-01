import { ComponentProps, PropsWithChildren } from 'react';
import { RecipeVariantProps, cva, cx } from 'styled-system/css';

const buttonStyle = cva({
  base: {
    alignItems: 'center',
    borderColor: 'slate.400',
    borderWidth: '0.06rem',
    cursor: 'pointer',
    display: 'flex',
    fontFamily: 'mono',
    justifyContent: 'center',
    lineHeight: 'tight',
    rounded: 'sm',
    transition: 'all',
    _hover: {
      borderColor: 'accent',
      color: 'accent',
    },
    _active: {
      scale: 0.95,
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: { px: 3, py: 2, fontSize: 'sm' },
      md: { px: 4, py: 2, fontSize: 'md' },
      lg: { px: 8, py: 4, fontSize: 'lg' },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: '0.5',
      },
    },
    selected: {
      true: {
        bg: 'accent-light',
        borderColor: 'accent',
        color: 'accent',
      },
    },
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;

type Props = PropsWithChildren<ButtonVariants & ComponentProps<'button'>>;

export function Button({ className, selected, size, ...props }: Props) {
  return (
    <button
      className={cx(
        buttonStyle({ disabled: props.disabled, selected, size }),
        className
      )}
      {...props}
    />
  );
}
