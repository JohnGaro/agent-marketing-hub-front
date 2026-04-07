import { useQuery, type QueryResult } from '../../../hooks/useAsync';
import { getListingAssets } from '../service/request';
import type { GeneratedAsset } from '../service/dto/out';

export function useListingAssets(uuid: string): QueryResult<GeneratedAsset[]> {
  return useQuery(() => getListingAssets(uuid), [uuid]);
}
