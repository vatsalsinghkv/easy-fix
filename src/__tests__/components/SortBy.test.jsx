import { fireEvent, render, screen } from '@testing-library/react';

import { SortBy } from '@/components';

describe('SortBy', () => {
  const mockOnSortChange = vi.fn();
  const mockSetOrder = vi.fn();

  it('renders the component with the correct name and value', () => {
    const { getByText } = render(
      <SortBy name="name" value="value" order="asc" />
    );
    expect(getByText('name')).toBeInTheDocument();
    expect(getByText('Sort by name in asc')).toBeInTheDocument();
  });

  it('calls onSortChange when the label is clicked', () => {
    const { getByText } = render(
      <SortBy name="name" value="value" onSortChange={mockOnSortChange} setOrder={mockSetOrder} order="asc" />
    );
    fireEvent.click(getByText('name'));
    expect(mockOnSortChange).toHaveBeenCalledWith('name');
  });

  it('calls setOrder when the sort icon is clicked', () => {
    const { getByTestId } = render(
      <SortBy name="name" value="value" onSortChange={mockOnSortChange} setOrder={mockSetOrder} order="asc" />
    );
    fireEvent.click(getByTestId("name"));
    expect(mockSetOrder).toHaveBeenCalledWith('name');
  });
});
