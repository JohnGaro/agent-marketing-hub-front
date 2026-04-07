import { useMutation, type MutationResult } from '../../../hooks/useAsync';
import { updateListing } from '../service/request';
import type { UpdateListingDto } from '../service/dto/in';
import type { Listing } from '../service/dto/out';

export function useUpdateListing(): MutationResult<[string, UpdateListingDto], Listing> {
  return useMutation(updateListing);
}
