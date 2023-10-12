import React from 'react';
import { toId } from '@/lib/utils/helper';

interface Props {
  name: string;
  value: string;
  setOrder: (order: string) => void;
  order: string;
  onSortChange: (id: string) => void;
}

const SortBy: React.FC<Props> = ({ name, value, setOrder, order, onSortChange }) => {
  const activeClasses = "text-accent border-accent bg-accent-light";
  return (
    <div>
      <div className={`cursor-pointer flex p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 relative group ${name === value ? activeClasses : ''}`}
        onClick={() => onSortChange(toId(name))}>
        <label className='cursor-pointer'>
          {name}
        </label>
        <span
          className='group text-accent ml-2 cursor-pointer'
          onClick={() => setOrder(toId(name))}
          data-testid={toId(name)}
        >
          <svg
            fill='currentColor'
            height='15px'
            width='15px'
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
        <span className='absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-10'>
          Sort by {name} in {order}
        </span>
      </div>
    </div>
  );
};

export default SortBy;
