import { Select } from '@/components';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

// TODO: Migrate to TS and use component's props
// eg.: const renderSelect = (props: React.componentProps<typeof Select>) => ...
const renderSelect = ({ checked, name, onChange, value }) => {
  return render(
    <Select checked={checked} name={name} onChange={onChange} value={value} />
  );
};

const baseProps = {
  checked: false,
  name: 'Test Name',
  onChange: () => null,
  value: 'Test Value',
};

describe('Select', () => {
  it('should renders the select input with the correct name', () => {
    renderSelect(baseProps);

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeInTheDocument();
    expect(selectInput).toHaveAttribute('name', 'Test Name');
  });

  it('should renders the label with the correct text', () => {
    renderSelect(baseProps);

    const label = screen.getByText(/Test Name/i);
    expect(label).toBeInTheDocument();
  });

  it('should render the input as checked', () => {
    renderSelect({ ...baseProps, checked: true });

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeChecked();
  });

  it('should fire onChange correctly', () => {
    let state = null;

    renderSelect({
      ...baseProps,
      onChange: (e) => (state = e.currentTarget.id),
    });

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeInTheDocument();
    fireEvent.click(selectInput);
    expect(state).toBe('test_name');
  });
});
