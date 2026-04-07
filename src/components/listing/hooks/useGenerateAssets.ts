import { useMutation, type MutationResult } from '../../../hooks/useAsync';
import { generateAssets } from '../service/request';
import type { GenerateAssetsDto } from '../service/dto/in';
import type { GeneratedAsset } from '../service/dto/out';

export function useGenerateAssets(): MutationResult<[string, GenerateAssetsDto], GeneratedAsset[]> {
  return useMutation(generateAssets);
}
