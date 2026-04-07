import { useMutation, type MutationResult } from '../../../hooks/useAsync';
import { regenerateAsset, type RegenerateAssetResult } from '../service/request';
import type { RegenerateAssetDto } from '../service/dto/in';

export function useRegenerateAsset(): MutationResult<
  [string, RegenerateAssetDto],
  RegenerateAssetResult
> {
  return useMutation(regenerateAsset);
}
