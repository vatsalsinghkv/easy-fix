import { Logo } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Logo', () => {
  it('renders the logo with the correct title', () => {
    render(<Logo title='Test Logo' classNme='test-class' />);

    const logo = screen.getByRole('heading', { name: /Test Logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('applies the correct classes', () => {
    render(<Logo title='Test Logo' classNme='test-class' />);

    const logo = screen.getByRole('heading', { name: /Test Logo/i });
    expect(logo).toHaveClass(
      'text-3xl font-light leading-relaxed sm:text-4xl test-class'
    );
  });

  it('renders a link to the homepage', () => {
    render(<Logo title='Test Logo' classNme='test-class' />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
