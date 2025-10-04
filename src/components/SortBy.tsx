import { toId } from '@/lib/utils';
import React from 'react';

interface Props {
  name: string;
  value: string;
  setOrder: (order: string) => void;
  order: string;
  onSortChange: (id: string) => void;
}

const SortBy: React.FC<Props> = ({
  name,
  value,
  setOrder,
  order,
  onSortChange,
}) => {
  const activeClasses = 'text-bg border-accent bg-accent shadow-glow';
  return (
    <div>
      <div
        className={`cursor-pointer flex px-4 py-2 font-mono text-sm font-semibold capitalize transition-all border-2 rounded-lg hover:text-accent hover:border-accent hover:shadow-glow hover:scale-105 focus:text-accent focus:border-accent border-dark-3 relative group ${
          name === value ? activeClasses : ''
        }`}
        onClick={() => onSortChange(toId(name))}
      >
        <label className='cursor-pointer'>{name}</label>
        <span
          className='group ml-2 cursor-pointer'
          onClick={() => setOrder(toId(name))}
          data-testid={toId(name)}
        >
          <svg
            fill='currentColor'
            height='18px'
            width='18px'
            version='1.1'
            id='Capa_1'
            viewBox='0 0 490 490'
          >
            <g>
              <polygon
                points='85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 
                0,194.27 37.087,221.213 	'
              />
              <polygon
                points='404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 
                490,295.715 452.913,268.802 	'
              />
            </g>
          </svg>
        </span>
        <span className='absolute top-12 scale-0 transition-all rounded-lg bg-gradient-hacktober border border-accent px-3 py-2 text-xs font-medium text-white group-hover:scale-100 z-10 shadow-glow whitespace-nowrap'>
          Sort by {name} in {order}
        </span>
      </div>
    </div>
  );
};

export default SortBy;
