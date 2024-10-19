import { useState } from 'react';

const MultiLevelSwitch = ({ options }) => {
  // selected
  const [selected, setSelected] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const addSelected = (option) => {
    setSelected((prev) => [...prev, option]);
  };

  const removeSelected = (value) => {
    setSelected((prev) => prev.filter((opt) => opt.value !== value));
  };

  return (
    <div>
      {selected.map(({ label, value }) => (
        <div
          key={value}
          className='p-2 bg-slate-800'
          onClick={() => removeSelected(value)}
        >
          {label}
        </div>
      ))}
      <input
        type='search'
        onFocus={() => setShowOptions(true)}
        // onBlur={() => setShowOptions(false)}
      />
      {showOptions && (
        <div className='flex flex-col'>
          {options.map(({ label, value }) => (
            <label key={value}>
              <input
                type='checkbox'
                onClick={(e) => {
                  e.target.checked
                    ? addSelected({ value, label })
                    : removeSelected(value);
                }}
                className='opacity-100'
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiLevelSwitch;
