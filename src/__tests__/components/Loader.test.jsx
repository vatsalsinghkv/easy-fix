import { Loader } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
  it('renders the loader', () => {
    render(<Loader />);

    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
  });

  it('has the correct classes', () => {
    render(<Loader />);

    const loader = screen.getByRole('status');
    expect(loader).toHaveClass(
      'inline-block h-14 w-14 animate-spin text-accent rounded-full border-4 border-solid border-current border-r-dark-3 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
    );
  });
});
