import { useQuery, type QueryResult } from '../../../hooks/useAsync';
import { getListing } from '../service/request';
import type { Listing } from '../service/dto/out';

export function useListing(uuid: string): QueryResult<Listing> {
  return useQuery(() => getListing(uuid), [uuid]);
}
