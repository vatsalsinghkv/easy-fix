import { FC } from 'react';
import { css } from 'styled-system/css';

const Loader: FC = () => {
  return (
    <div
      className={css({
        display: 'inline-block',
        h: '14',
        w: '14',
        color: 'accent',
        transform: 'rotate(360deg)',
        animation: 'spin',
        rounded: 'full',
        borderRightColor: 'dark-3',
        borderWidth: '4px',
        borderStyle: 'solid',
        borderColor: 'current',
        verticalAlign: '-0.125em',
        _motionReduce: {
          transform: 'rotate(360deg)',
          animation: 'spin_1.5s_linear_infinite',
        },
      })}
      role='status'
    />
  );
};

export default Loader;
