import { useQuery, type QueryResult } from '../../../hooks/useAsync';
import { getListings } from '../service/request';
import type { Listing } from '../service/dto/out';

export function useListings(): QueryResult<Listing[]> {
  return useQuery(() => getListings(), []);
}
