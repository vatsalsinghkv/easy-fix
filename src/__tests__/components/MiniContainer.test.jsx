import { render, screen } from '@testing-library/react';

import { MiniContainer } from '@/components';

describe('MiniContainer', () => {
  it('renders the title', () => {
    render(<MiniContainer title='Test Title'>Test Content</MiniContainer>);

    const title = screen.getByText(/Test Title/i);
    expect(title).toBeInTheDocument();
  });

  it('renders the children', () => {
    render(<MiniContainer title='Test Title'>Test Content</MiniContainer>);

    const content = screen.getByText(/Test Content/i);
    expect(content).toBeInTheDocument();
  });

  it('has the correct classes', () => {
    render(<MiniContainer title='Test Title'>Test Content</MiniContainer>);

    const container = screen.getByRole('heading', {
      name: /Test Title/i,
    }).parentElement;
    expect(container).toHaveClass('space-y-2');
  });
});
