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
    <div className={`flex items-center gap-2 ${className}`}>
      <span className='text-sm text-text'>Issues per page:</span>
      <select
        value={value.toString()}
        onChange={handleChange}
        className='px-3 py-1.5 text-xs font-mono border rounded cursor-pointer bg-bg border-dark-2 hover:border-accent focus:border-accent focus:outline-none text-text'
      >
        {ISSUES_PER_PAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IssuesPerPageSelector;
