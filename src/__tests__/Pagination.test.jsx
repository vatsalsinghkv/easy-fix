import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Pagination } from '../components';

describe('Pagination', () => {
  const firstPage = 1;
  const totalPage = 10;

  it('renders the first and the last page button', () => {
    // ARRANGE
    render(<Pagination totalPages={totalPage} currentPage={firstPage} />);
    const firstBtn = screen.getByText(firstPage);
    const lastBtn = screen.getByText(totalPage);

    // ASSERT
    expect(+firstBtn.textContent).toBe(firstPage);
    expect(+lastBtn.textContent).toBe(totalPage);
  });

  it('renders the given siblings button', () => {
    const siblings = 1;
    const currentPage = 5;
    // [4, 5, 6]
    const btns = [...Array(2 * siblings + 1)].map(
      (_, i) => i + currentPage - siblings
    );

    // Arrange
    render(
      <Pagination
        siblings={siblings}
        totalPages={totalPage}
        currentPage={currentPage}
      />
    );

    const btnsEl = [];
    btns.forEach((i) => {
      btns.push(screen.getByText(i));
    });

    // ASSERT
    btnsEl.forEach((btn, i) => {
      expect(+btn.textContent).toBe(btns[i]);
    });
  });
});
