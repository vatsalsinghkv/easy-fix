import { ComponentProps, PropsWithChildren } from 'react';
import { css, cx } from 'styled-system/css';

type Props = {
  title: string;
} & ComponentProps<'div'>;

const MiniContainer = ({
  children,
  className,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <div className={cx(css({ my: 2 }), className)}>
      <h3
        className={css({
          color: 'dark-2',
          fontSize: 'sm',
          fontWeight: 'bold',
          fontFamily: 'sans',
          textTransform: 'uppercase',
        })}
      >
        {title}
      </h3>
      <div className={css({ color: 'white', lineHeight: 'tight', mt: 2 })}>
        {children}
      </div>
    </div>
  );
};

export default MiniContainer;
