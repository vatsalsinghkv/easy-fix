import { render, screen } from '@testing-library/react';

import { Select } from '@/components';

describe('Select', () => {
  it('renders the select input with the correct name', () => {
    render(<Select name='Test Name' value='Test Value' />);

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeInTheDocument();
    expect(selectInput).toHaveAttribute('name', 'language');
  });

  it('renders the label with the correct text', () => {
    render(<Select name='Test Name' value='Test Value' />);

    const label = screen.getByText(/Test Name/i);
    expect(label).toBeInTheDocument();
  });

  it('checks the input if the value matches the name', () => {
    render(<Select name='Test Name' value='Test Name' />);

    const selectInput = screen.getByRole('radio');
    expect(selectInput).toBeChecked();
  });

  it('does not check the input if the value does not match the name', () => {
    render(<Select name='Test Name' value='Different Value' />);

    const selectInput = screen.getByRole('radio');
    expect(selectInput).not.toBeChecked();
  });
});
