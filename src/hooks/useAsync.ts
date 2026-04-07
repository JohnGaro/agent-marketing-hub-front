import { useState, useEffect, useCallback, useRef, type DependencyList } from 'react';
import { AxiosError } from 'axios';

function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) return err.response?.data?.message ?? err.message;
  if (err instanceof Error) return err.message;
  return 'Unknown error';
}

export interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useQuery<T>(fetcher: () => Promise<T>, deps: DependencyList = []): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mountedRef.current) setData(result);
    } catch (err) {
      if (mountedRef.current) setError(extractErrorMessage(err));
    } finally {
      if (mountedRef.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    execute();
    return () => { mountedRef.current = false; };
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

export interface MutationResult<TArgs extends unknown[], TResult> {
  data: TResult | null;
  loading: boolean;
  error: string | null;
  mutate: (...args: TArgs) => Promise<TResult>;
  reset: () => void;
}

export function useMutation<TArgs extends unknown[], TResult>(
  mutationFn: (...args: TArgs) => Promise<TResult>,
): MutationResult<TArgs, TResult> {
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutationFn(...args);
        setData(result);
        return result;
      } catch (err) {
        const msg = extractErrorMessage(err);
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
}
