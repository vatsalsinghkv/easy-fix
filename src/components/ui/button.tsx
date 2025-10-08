import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

const buttonVariants = cva(
  "flex gap-2 justify-center items-center text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-accent/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'font-mono flex gap-2 justify-center items-center text-sm capitalize transition-all border rounded  hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 peer-checked:text-accent hover:bg-accent-light focus:bg-accent-light',
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
        sm: 'rounded-md p-3 py-1.5 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface DefaultProps {
  children: React.ReactNode | string;
  className?: string;
  size?: 'lg' | 'sm';
  center?: boolean;
}

interface LinkProps extends React.ComponentProps<'a'> {
  href: string;
  sameTab?: boolean;
}

interface ButtonProps extends React.ComponentProps<'button'> {
  onClick?: (event: React.MouseEvent) => void;
}

type Props =
  | ({
      type?: 'button';
    } & ButtonProps &
      DefaultProps)
  | ({
      type: 'link';
    } & LinkProps &
      DefaultProps);

function Button(props: Props & VariantProps<typeof buttonVariants>) {
  const { className, variant, size, children, ...rest } = props;
  const isLink = props.type === 'link';

  if (isLink) {
    const { href, sameTab, ...linkProps } = rest as LinkProps & DefaultProps;
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

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...(rest as ButtonProps)}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };
