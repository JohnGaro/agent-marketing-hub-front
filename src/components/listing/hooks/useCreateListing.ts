import { useMutation, type MutationResult } from '../../../hooks/useAsync';
import { createListing } from '../service/request';
import type { CreateListingDto } from '../service/dto/in';
import type { Listing } from '../service/dto/out';

export function useCreateListing(): MutationResult<[CreateListingDto], Listing> {
  return useMutation(createListing);
}
