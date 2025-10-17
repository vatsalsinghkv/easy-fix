import { AVAILABLE_ISSUES_PER_PAGE } from '@/lib/utils/config';
import React from 'react';

interface Props {
  value: number;
  onChange: (itemsPerPage: number) => void;
  className?: string;
}

const ISSUES_PER_PAGE_OPTIONS = AVAILABLE_ISSUES_PER_PAGE.map((value) => ({
  value,
  label: `${value} items`,
}));

const IssuesPerPageSelector: React.FC<Props> = ({
  value,
  onChange,
  className = '',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    onChange(selectedValue);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className='text-sm font-semibold text-dark-2'>
        Issues per page:
      </span>
      <select
        value={value.toString()}
        onChange={handleChange}
        className='px-4 py-2 text-sm font-mono font-semibold border-2 rounded-lg cursor-pointer bg-bg-secondary/50 backdrop-blur-sm border-dark-3 hover:border-accent focus:border-accent focus:shadow-glow focus:outline-none text-text transition-all'
      >
        {ISSUES_PER_PAGE_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className='bg-bg-secondary'
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IssuesPerPageSelector;
