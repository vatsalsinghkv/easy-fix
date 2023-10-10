import { SortingTagFilter } from '@/components';
import { getSortingTagLabel } from '@/models/SortingTag';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

type Props = ComponentProps<typeof SortingTagFilter>;

const renderElement = (props: Props): RenderResult => {
  return render(<SortingTagFilter {...props} />);
};

const baseProps: Props = {
  isSelected: false,
  onClick: () => null,
  ordering: 'desc',
  value: 'best-match',
};

describe.concurrent('SortingTagFilter', () => {
  it('should render an unselected button WITHOUT tool-tip correctly', () => {
    const screen = renderElement(baseProps);

    const expectedLabelText = getSortingTagLabel(baseProps.value);
    const expectedToolTipText = `Sorted by ${expectedLabelText} in ${baseProps.ordering}`;

    expect(screen.queryByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.queryByText(expectedToolTipText)).not.toBeInTheDocument();
  });

  it('should render a selected button WITH tool-tip correctly', () => {
    const props: Props = { ...baseProps, isSelected: true };
    const screen = renderElement(props);

    const expectedLabelText = getSortingTagLabel(props.value);
    const expectedToolTipText = `Sorted by ${expectedLabelText} in ${props.ordering}`;

    expect(screen.queryByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.queryByText(expectedToolTipText)).toBeInTheDocument();
  });

  it('should invoke onClick on button click', () => {
    const props: Props = {
      isSelected: false,
      onClick: vi.fn(),
      ordering: 'desc',
      value: 'reactions',
    };
    const screen = renderElement(props);

    fireEvent.click(screen.getByRole('button', { name: /reactions/i }));
    expect(props.onClick).to.toBeCalled();
  });

  describe.concurrent(
    'should have the correct icon displayed if the filter is selected',
    () => {
      it('and ordering is set to ASC', () => {
        const screen = renderElement({
          ...baseProps,
          isSelected: true,
          ordering: 'asc',
        });

        expect(screen.queryByLabelText('ordering-asc')).toBeInTheDocument();
      });
      it('and ordering is set to DESC', () => {
        const screen = renderElement({
          ...baseProps,
          isSelected: true,
          ordering: 'desc',
        });

        expect(screen.queryByLabelText('ordering-desc')).toBeInTheDocument();
      });
    }
  );
});
