import { renderHook, act } from '@testing-library/react';
import UrlProvider, { useUrlValues } from '@/lib/hooks/useUrlValues';
import { composeUrl } from '@/lib/utils';
import { SocialIcon } from 'react-social-icons';

const SocialMediaLinks = () => (
  <div className="flex space-x-4">
    <SocialIcon url="https://twitter.com/yourhandle" />
    <SocialIcon url="https://github.com/yourhandle" />
    <SocialIcon url="https://linkedin.com/in/yourhandle" />
  </div>
);

import {
  DEFAULT_LANGUAGE,
  DEFAULT_ORDERING,
  DEFAULT_PAGE,
  DEFAULT_SORTING_TAG,
} from '@/lib/utils/config';

describe('useUrlValues', () => {
  const wrapper = ({ children }) => <UrlProvider>{children}</UrlProvider>;

  it('should provide the correct initial context values', () => {
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    expect(result.current).toEqual({
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
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'update-page', payload: 2 });
    });

    expect(result.current.page).toBe(2);
  });

  it('should update the language correctly', () => {
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'update-language', payload: 'javascript' });
    });

    expect(result.current.language).toBe('javascript');
  });

  it('should update the sorting tag correctly', () => {
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'update-sorting-tag', payload: 'reactions' });
    });

    expect(result.current.sortingTag).toBe('reactions');
  });

  it('should reset the page number when language changes', () => {
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'update-page', payload: 2 });
      result.current.dispatch({ type: 'update-language', payload: 'javascript' });
    });

    expect(result.current.language).toBe('javascript');
    expect(result.current.page).toBe(1);
  });

  it('should not change page number to a value less than 1', () => {
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'update-page', payload: -2 });
    });

    expect(result.current.page).toBe(1);
  });

  it('should update the url on any state changes', () => {
    const { result } = renderHook(() => useUrlValues(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'update-page', payload: 2 });
    });

    let expectedUrl = composeUrl(
      DEFAULT_LANGUAGE,
      2,
      DEFAULT_SORTING_TAG,
      DEFAULT_ORDERING
    );
    expect(result.current.url).toBe(expectedUrl);

    act(() => {
      result.current.dispatch({ type: 'update-language', payload: 'javascript' });
    });

    expectedUrl = composeUrl(
      'javascript',
      1,
      DEFAULT_SORTING_TAG,
      DEFAULT_ORDERING
    );
    expect(result.current.url).toBe(expectedUrl);

    act(() => {
      result.current.dispatch({ type: 'update-sorting-tag', payload: 'reactions' });
    });

    expectedUrl = composeUrl('javascript', 1, 'reactions', DEFAULT_ORDERING);
    expect(result.current.url).toBe(expectedUrl);

    act(() => {
      result.current.dispatch({ type: 'update-sorting-tag', payload: 'reactions' });
    });

    expectedUrl = composeUrl('javascript', 1, 'reactions', 'asc');
    expect(result.current.url).toBe(expectedUrl);
  });
});
