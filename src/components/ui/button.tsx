import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

const buttonVariants = cva(
  "flex gap-2 justify-center items-center text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-accent/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'font-mono text-sm capitalize transition-all border rounded hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 peer-checked:text-accent hover:bg-accent-light focus:bg-accent-light',
        input:
          'font-mono text-sm capitalize transition-all border rounded hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 peer-checked:text-accent focus:bg-accent-light peer-checked:text-accent peer-checked:border-accent peer-checked:bg-accent-light peer-focus:outline-none',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-primary text-primary bg-background shadow-xs hover:bg-primary/20 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'p-3 py-1.5',
        sm: 'text-xs rounded p-3 py-1.5 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'h-8 w-8 md:h-9 md:w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface LinkProps extends React.ComponentProps<'a'> {
  href: string;
  sameTab?: boolean;
}

interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'type'> {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent) => void;
}

interface InputProps extends React.ComponentProps<'input'> {
  onClick?: (event: React.MouseEvent) => void;
}

interface LabelProps extends React.ComponentProps<'label'> {
  onClick?: (event: React.MouseEvent) => void;
}

type Props =
  | ({
      as?: 'button';
    } & ButtonProps)
  | ({
      as: 'link';
    } & LinkProps)
  | ({
      as: 'input';
    } & InputProps)
  | ({
      as: 'label';
    } & LabelProps);

function Button(props: Props & VariantProps<typeof buttonVariants>) {
  const { className, variant, size, children, ...rest } = props;
  const isLink = props.as === 'link';
  const isInput = props.as === 'input';
  const isLabel = props.as === 'label';

  if (isLink) {
    const { href, sameTab, ...linkProps } = rest as LinkProps;
    return (
      <a
        href={href}
        target={sameTab ? '_self' : '_blank'}
        rel={sameTab ? undefined : 'noopener noreferrer'}
        className={cn(buttonVariants({ variant, size, className }))}
        {...linkProps}
      >
        {children}
      </a>
    );
  }

  if (isInput) {
    return (
      <input
        className={cn(buttonVariants({ variant, size, className }))}
        {...(rest as InputProps)}
      />
    );
  }

  if (isLabel) {
    return (
      <label
        className={cn(buttonVariants({ variant, size, className }))}
        {...(rest as LabelProps)}
      >
        {children}
      </label>
    );
  }

  return (
    <button
      type='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...(rest as ButtonProps)}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };
