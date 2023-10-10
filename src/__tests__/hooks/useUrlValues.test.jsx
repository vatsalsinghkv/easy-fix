import {
  DEFAULT_LANGUAGE,
  DEFAULT_ORDERING,
  DEFAULT_PAGE,
  DEFAULT_SORTING_TAG,
} from '@/lib/utils/config';
import { composeUrl } from '@/lib/utils/helper';
import UrlProvider, { useUrlValues } from '@/providers/urlProvider';
import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useUrlValues', () => {
  let result;
  function TestComponent() {
    result = useUrlValues();
    return null;
  }

  beforeEach(() => {
    render(
      <UrlProvider>
        <TestComponent />
      </UrlProvider>
    );
  });

  it('should provide the correct initial context values', () => {
    expect(result).toEqual({
      dispatch: expect.any(Function),
      language: DEFAULT_LANGUAGE,
      ordering: DEFAULT_ORDERING,
      page: DEFAULT_PAGE,
      sortingTag: DEFAULT_SORTING_TAG,
      url: composeUrl(
        DEFAULT_LANGUAGE,
        DEFAULT_PAGE,
        DEFAULT_SORTING_TAG,
        DEFAULT_ORDERING
      ),
    });
  });

  it('should update the page number correctly', () => {
    act(() => {
      result.dispatch({ type: 'update-page', payload: 2 });
    });

    expect(result.page).toBe(2);
  });

  it('should update the language correctly', () => {
    act(() => {
      result.dispatch({ type: 'update-language', payload: 'javascript' });
    });

    expect(result.language).toBe('javascript');
  });

  it('should update the sorting tag correctly', () => {
    act(() => {
      result.dispatch({ type: 'update-sorting-tag', payload: 'reactions' });
    });

    expect(result.sortingTag).toBe('reactions');
  });

  it('should reset the page number when language changes', () => {
    act(() => {
      result.dispatch({ type: 'update-page', payload: 2 });
      result.dispatch({ type: 'update-language', payload: 'javascript' });
    });

    expect(result.language).toBe('javascript');
    expect(result.page).toBe(1);
  });

  it('should not change page number to a value less than 1', () => {
    act(() => {
      result.dispatch({ type: 'update-page', payload: -2 });
    });

    expect(result.page).toBe(1);
  });

  it('should update the url on any state changes', () => {
    act(() => {
      // Update page
      result.dispatch({ type: 'update-page', payload: 2 });
    });

    let expectedUrl = composeUrl(
      DEFAULT_LANGUAGE,
      2,
      DEFAULT_SORTING_TAG,
      DEFAULT_ORDERING
    );
    expect(result.url).toBe(expectedUrl);

    act(() => {
      // Update the language
      result.dispatch({ type: 'update-language', payload: 'javascript' });
    });

    expectedUrl = composeUrl(
      'javascript',
      2,
      DEFAULT_SORTING_TAG,
      DEFAULT_ORDERING
    );
    expect(result.url).toBe(expectedUrl);

    act(() => {
      // Update the sorting tag, this will also reset the page number and the ordering
      result.dispatch({ type: 'update-sorting-tag', payload: 'reactions' });
    });

    expectedUrl = composeUrl('javascript', 1, 'reactions', DEFAULT_ORDERING);
    expect(result.url).toBe(expectedUrl);

    act(() => {
      // Update the ordering by selecting the same language
      result.dispatch({ type: 'update-sorting-tag', payload: 'reactions' });
    });

    expectedUrl = composeUrl('javascript', 1, 'reactions', 'asc');
    expect(result.url).toBe(expectedUrl);
  });
});
