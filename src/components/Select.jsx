import { toId } from '@/lib/utils/helper';

const Select = ({ name, value, onChange }) => {
  return (
    <div>
      <input
        className='hidden peer'
        type='radio'
        defaultChecked={value === name}
        name='language'
        onChange={onChange}
        id={toId(name)}
      />
      <label
        className='inline-block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-slate-400  2eer-checked:text-accent peer-checked:text-accent peer-checked:border-accent peer-checked:bg-accent-light'
        htmlFor={toId(name)}
      >
        {name}
      </label>
    </div>
  );
};

export default Select;
