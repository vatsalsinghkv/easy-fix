import { toId } from '@/lib/utils';

// Resolved the conflict between the two interfaces
interface Props {
  name: string;
  value: string;
  checked: boolean; // Added the missing 'checked' property
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: 'radio' | 'checkbox';
}

// Updated the component definition to include the 'checked' property
const Select: React.FC<Props> = ({ name, value, onChange, checked, inputType = 'radio' }) => {
  return (
    <>
      <input
        checked={checked}
        className='hidden peer'
        type={inputType}
        name={name}
        onChange={onChange}
        id={toId(name)}
        value={value}
      />
      <label
        className='block p-3 py-1.5 font-mono text-xs capitalize transition-all border rounded cursor-pointer hover:text-accent hover:border-accent focus:text-accent focus:border-accent border-dark-2 peer-hover:border-accent peer-focus:border-accent peer-focus:text-accent peer-checked:text-accent peer-checked:border-accent peer-checked:bg-accent-light peer-focus:outline-none'
        htmlFor={toId(name)}
      >
        {name}
      </label>
    </>
  );
};

export default Select;
