import { useMutation, type MutationResult } from '../../../hooks/useAsync';
import { enhanceListing } from '../service/request';
import type { EnhanceResponse } from '../service/dto/out';

export function useEnhanceListing(): MutationResult<[string], EnhanceResponse> {
  return useMutation(enhanceListing);
}
