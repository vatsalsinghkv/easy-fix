import { toId } from '@/lib/utils';

// Resolved the conflict between the two interfaces
interface Props {
  name: string;
  value: string;
  checked: boolean; // Added the missing 'checked' property
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Updated the component definition to include the 'checked' property
const Select: React.FC<Props> = ({ name, value, onChange, checked }) => {
  return (
    <>
      <input
        checked={checked}
        className='hidden peer'
        type='radio'
        name={name}
        onChange={onChange}
        id={toId(name)}
        value={value}
      />
      <label
        className='block px-4 py-2 font-mono text-sm font-semibold capitalize transition-all border-2 rounded-lg cursor-pointer hover:text-accent hover:border-accent hover:shadow-glow focus:text-accent focus:border-accent border-dark-3 peer-hover:border-accent peer-hover:scale-105 peer-focus:border-accent peer-focus:text-accent peer-checked:text-bg peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-glow peer-focus:outline-none'
        htmlFor={toId(name)}
      >
        {name}
      </label>
    </>
  );
};

export default Select;
