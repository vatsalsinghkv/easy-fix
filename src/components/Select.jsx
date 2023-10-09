import { toId } from '@/lib/utils/helper';

const Select = ({ checked, name, onChange, value }) => {
  return (
    <>
      <input
        checked={checked}
        className='inline appearance-none peer'
        type='radio'
        name={name}
        onChange={onChange}
        id={toId(name)}
        value={value}
      />
      <label
        className='block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400 peer-hover:border-accent peer-focus:border-accent peer-focus:text-accent peer-checked:text-accent peer-checked:border-slate-400 peer-checked:bg-accent-light peer-focus:outline-none'
        htmlFor={toId(name)}
      >
        {name}
      </label>
    </>
  );
};

export default Select;
