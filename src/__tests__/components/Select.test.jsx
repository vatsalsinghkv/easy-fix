import { Select } from '@/components';
import { fireEvent, render, screen } from '@testing-library/react';

// TODO: Migrate to TS and use component's props
// eg.: const renderSelect = (props: React.componentProps<typeof Select>) => ...
const renderSelect = (name, value, onChange) => {
  return render(<Select name={name} onChange={onChange} value={value} />);
};

describe('Select', () => {
  it('should renders the select input with the correct name', () => {
    renderSelect('Test Name', 'Test Value');

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeInTheDocument();
    expect(selectInput).toHaveAttribute('name', 'language');
  });

  it('should renders the label with the correct text', () => {
    renderSelect('Test Name', 'Test Value');

    const label = screen.getByText(/Test Name/i);
    expect(label).toBeInTheDocument();
  });

  it('should checks the input if the value matches the name', () => {
    renderSelect('Test Name', 'Test Name');

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeChecked();
  });

  it('should does not check the input if the value does not match the name', () => {
    renderSelect('Test Name', 'Different Value');

    const selectInput = screen.getByRole('radio');
    expect(selectInput).not.toBeChecked();
  });

  it('should fire onChange correctly', () => {
    let state = null;
    const onChange = (e) => {
      state = e.currentTarget.id;
    };

    renderSelect('Test Name', 'Different Value', onChange);

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeInTheDocument();
    fireEvent.click(selectInput);
    expect(state).toBe('test_name');
  });
});
