import { toId } from '@/lib/utils/helper';

const Select = ({ checked, name, onChange, value }) => {
  return (
    <div>
      <input
        className='appearance-none peer'
        type='radio'
        checked={checked}
        name={name}
        onChange={onChange}
        value={value}
        id={toId(name)}
      />
      <label
        className='p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 peer-hover:border-accent peer-focus:border-accent peer-focus:text-accent peer-checked:text-accent peer-checked:border-slate-400 peer-checked:bg-accent-light peer-focus:outline-none'
        htmlFor={toId(name)}
      >
        {name}
      </label>
    </div>
  );
};

export default Select;
