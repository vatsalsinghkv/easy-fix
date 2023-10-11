import useFetch from '@/lib/hooks/use-fetch';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useFetch', () => {
  const fetchSpy = vi.spyOn(global, 'fetch');

  const resolveStub = Promise.resolve(
    new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
    })
  );

  const rejectedStub = Promise.resolve(
    new Response(JSON.stringify({ status: 'fetch failed' }), {
      status: 400,
    })
  );

  it('should fetch data successfully', async () => {
    let hook = null;

    fetchSpy.mockReturnValue(resolveStub);

    await act(async () => {
      hook = renderHook(() => useFetch('https://sample-api.com/users'));
    });

    const { result } = hook;
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();
  });

  it('should handle error correctly', async () => {
    fetchSpy.mockReturnValue(rejectedStub);

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
