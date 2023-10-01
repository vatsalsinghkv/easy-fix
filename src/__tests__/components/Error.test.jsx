import { render, screen } from '@testing-library/react';

import { Error } from '../../components';

describe('Error', () => {
  it('renders the error message', () => {
    render(<Error title='Test Error'>This is a test error message</Error>);

    const errorMessage = screen.getByText(/This is a test error message/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the error title', () => {
    render(<Error title='Test Error'>This is a test error message</Error>);

    const errorTitle = screen.getByRole('heading', { name: /test error/i });
    expect(errorTitle).toBeInTheDocument();
  });

  it('renders the link when provided', () => {
    render(
      <Error
        title='Test Error'
        link={{ url: 'https://test.com', name: 'Test Link' }}
      >
        This is a test error message
      </Error>
    );

    const linkElement = screen.getByRole('button', { name: /test link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://test.com');
  });

  it('does not render the link when not provided', () => {
    render(<Error title='Test Error'>This is a test error message</Error>);

    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });
});
