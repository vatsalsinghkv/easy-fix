import { Button } from '@/components/ui/button';
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
      <Button as='label' variant='input' size='sm' htmlFor={toId(name)}>
        {name}
      </Button>
    </>
  );
};

export default Select;
