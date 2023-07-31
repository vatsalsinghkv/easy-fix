import { toId } from '../utils/helper';

const Select = ({ name, value }) => {
  return (
    <div>
      <input
        className='hidden peer'
        type='radio'
        defaultChecked={value === name}
        name='language'
        id={toId(name)}
      />
      <label
        className='inline-block p-3 py-1 font-mono text-sm capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-text peer-checked:text-accent peer-checked:border-accent peer-checked:bg-accent-light'
        htmlFor={toId(name)}
      >
        {name}
      </label>
    </div>
  );
};

export default Select;
