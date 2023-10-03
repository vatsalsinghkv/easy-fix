import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useFetch from '@/hooks/use-fetch';

describe('useFetch', () => {
  const fetchSpy = vi.spyOn(global, 'fetch');

  const mockResolveValue = {
    ok: true,
    json: () => new Promise((resolve) => resolve({ status: 'ok' })),
  };

  const mockRejectValue = {
    ok: false,
    json: () =>
      new Promise((resolve, reject) => reject(new Error('fetch failed'))),
  };

  it('should fetch data successfully', async () => {
    let hook = null;
    fetchSpy.mockReturnValue(mockResolveValue);
    await act(async () => {
      hook = renderHook(() => useFetch('https://sample-api.com/users'));
    });

    const { result } = hook;
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();
  });

  it('should handle error correctly', async () => {
    fetchSpy.mockReturnValue(mockRejectValue);
    let hook = null;
    await act(async () => {
      hook = renderHook(() => useFetch('https://invalid-url'));
    });
    const { result } = hook;
    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.data).toBeNull();
  });
});
