import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import getReducer, { State, getDefaultState } from './reducer';

type Options = {
  autoFetch: boolean;
  onError: () => void;
  onSuccess: () => void;
};

type RequestReturnValue<TData extends any> = {
  run: () => void;
} & State<TData>;

export function useAsync<TData extends any = unknown>(
  promiseFn: (signal?: AbortSignal) => Promise<TData>,
  options?: Partial<Options>
): RequestReturnValue<TData> {
  const isMountedRef = useRef<boolean>(false);
  const optionsRef = useRef<Partial<Options> | undefined>(options);
  const promiseFnRef =
    useRef<(signal?: AbortSignal) => Promise<TData>>(promiseFn);
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const [
    { data, error, isIdle, isPending, isRejected, isResolved, status },
    dispatch,
  ] = useReducer(getReducer<TData>(), getDefaultState());

  promiseFnRef.current = promiseFn;
  optionsRef.current = options;

  const run = useCallback(() => {
    const abortController = abortControllerRef.current;
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
    abortControllerRef.current = new AbortController();

    dispatch({ type: 'load' });

    const options = optionsRef.current;

    promiseFnRef
      .current(abortControllerRef.current.signal)
      .then((payload) => {
        dispatch({ type: 'resolved', payload });

        options?.onSuccess && options?.onSuccess();

        return payload;
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch({ type: 'rejected', payload: error });

          options?.onError && options?.onError();

          return Promise.reject(error);
        }

        const customError = new Error('Something went wrong');
        dispatch({ type: 'rejected', payload: customError });

        return Promise.reject(customError);
      });
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (options?.autoFetch && isMountedRef.current) {
      run();
    }

    return () => {
      abortControllerRef.current.abort();
    };
  }, [options?.autoFetch, run]);

  const value = useMemo(
    () => ({
      data,
      error,
      isIdle,
      isPending,
      isRejected,
      isResolved,
      run,
      status,
    }),
    [data, error, isIdle, isPending, isRejected, isResolved, run, status]
  );

  return value as RequestReturnValue<TData>;
}

export default useAsync;
