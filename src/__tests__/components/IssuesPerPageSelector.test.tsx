import { render, screen, fireEvent } from '@testing-library/react';
import IssuesPerPageSelector from '@/components/IssuesPerPageSelector';
import { expect, vi, describe, it } from 'vitest';

describe('IssuesPerPageSelector', () => {
  it('renders with initial value', () => {
    const mockOnChange = vi.fn();
    render(<IssuesPerPageSelector value={10} onChange={mockOnChange} />);
    
    const labelText = screen.getByText('Items per page:');
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    
    expect(labelText).toBeTruthy();
    expect(selectElement).toBeTruthy();
    expect(selectElement.value).toBe('10');
  });

  it('displays all available options', () => {
    const mockOnChange = vi.fn();
    render(<IssuesPerPageSelector value={10} onChange={mockOnChange} />);
    
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    const options = selectElement.querySelectorAll('option');
    
    expect(options.length).toBe(4);
    expect(options[0].value).toBe('5');
    expect(options[0].textContent).toBe('5 items');
    expect(options[1].value).toBe('10');
    expect(options[1].textContent).toBe('10 items');
    expect(options[2].value).toBe('20');
    expect(options[2].textContent).toBe('20 items');
    expect(options[3].value).toBe('50');
    expect(options[3].textContent).toBe('50 items');
  });

  it('calls onChange when selection changes', () => {
    const mockOnChange = vi.fn();
    render(<IssuesPerPageSelector value={10} onChange={mockOnChange} />);
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '20' } });
    
    expect(mockOnChange).toHaveBeenCalledWith(20);
  });

  it('applies custom className', () => {
    const mockOnChange = vi.fn();
    const customClass = 'custom-test-class';
    render(<IssuesPerPageSelector value={10} onChange={mockOnChange} className={customClass} />);
    
    const container = screen.getByText('Items per page:').parentElement;
    expect(container?.classList.contains(customClass)).toBe(true);
  });
});