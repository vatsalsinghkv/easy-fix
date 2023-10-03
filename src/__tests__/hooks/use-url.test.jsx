import { act, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UseUrlProvider, { useUrl } from '@/hooks/use-url';

describe('useUrl', () => {
  let result;
  function TestComponent() {
    result = useUrl();
    return null;
  }

  beforeEach(() => {
    render(
      <UseUrlProvider>
        <TestComponent />
      </UseUrlProvider>
    );
  });

  it('provides the correct initial context value', () => {
    expect(result).toEqual({
      url: expect.any(String),
      changePage: expect.any(Function),
      language: expect.any(String),
      setLanguage: expect.any(Function),
      page: expect.any(Number),
    });
  });

  it('changes page number correctly', () => {
    act(() => {
      result.changePage(2);
    });

    expect(result.page).toBe(2);
  });

  it('changes language correctly', () => {
    act(() => {
      result.setLanguage('javascript');
    });

    expect(result.language).toBe('javascript');
  });

  it('resets page number when language changes', () => {
    act(() => {
      result.changePage(2);
      result.setLanguage('javascript');
    });

    expect(result.page).toBe(1);
  });

  it('does not change page number to a value less than 1', () => {
    act(() => {
      result.changePage(-1);
    });

    expect(result.page).toBe(1);
  });
});
