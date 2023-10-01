import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from '../../components';
import PaginationButton from '../../components/Pagination/PaginationButton';
import { TOTAL_SIBLING_BUTTONS } from '../../utils/config';

describe('Pagination', () => {
  const firstPage = 1;
  const totalPage = 10;

  it('does not render if totalPages is 1 or less', () => {
    render(<Pagination totalPages={1} currentPage={1} onChange={() => {}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    render(<Pagination totalPages={0} currentPage={1} onChange={() => {}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the first and the last page button', () => {
    // ARRANGE
    render(<Pagination totalPages={totalPage} currentPage={firstPage} />);
    const firstBtn = screen.getByRole('button', { name: firstPage });
    const lastBtn = screen.getByRole('button', { name: totalPage });

    // ASSERT
    expect(+firstBtn.textContent).toBe(firstPage);
    expect(+lastBtn.textContent).toBe(totalPage);
  });

  it(`renders the given i.e. ${TOTAL_SIBLING_BUTTONS} siblings button`, () => {
    const siblings = TOTAL_SIBLING_BUTTONS;
    const currentPage = 5;
    // [4, 5, 6]
    const btns = [...Array(2 * siblings + 1)].map(
      (_, i) => i + currentPage - siblings
    );

    // Arrange
    render(
      <Pagination
        siblings={TOTAL_SIBLING_BUTTONS}
        totalPages={totalPage}
        currentPage={currentPage}
      />
    );

    const btnsEl = [];
    btns.forEach((i) => {
      btns.push(screen.getByRole('button', { name: i }));
    });

    // ASSERT
    btnsEl.forEach((btn, i) => {
      expect(+btn.textContent).toBe(btns[i]);
    });
  });
});

describe('PaginationButton', () => {
  it('calls onChange with the correct page number when clicked', () => {
    const onChange = vi.fn();

    render(<PaginationButton num={2} currentPage={1} onChange={onChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(onChange).toHaveBeenCalledWith(2);

    render(
      <PaginationButton
        type='prev'
        num={1}
        currentPage={2}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('1'));
    expect(onChange).toHaveBeenCalledWith(1);

    render(
      <PaginationButton
        type='next'
        num={3}
        currentPage={2}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();

    render(
      <PaginationButton
        disable={true}
        num={2}
        currentPage={1}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('2'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
