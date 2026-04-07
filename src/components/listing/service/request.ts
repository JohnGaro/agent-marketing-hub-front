import api from '../../../lib/api';
import type {
  CreateListingDto,
  UpdateListingDto,
  GenerateAssetsDto,
  RegenerateAssetDto,
} from './dto/in';
import type {
  Listing,
  EnhanceResponse,
  GeneratedAsset,
} from './dto/out';

export async function createListing(data: CreateListingDto): Promise<Listing> {
  const response = await api.post<Listing>('/listings', data);
  return response.data;
}

export async function getListings(): Promise<Listing[]> {
  const response = await api.get<Listing[]>('/listings');
  return response.data;
}

export async function getListing(uuid: string): Promise<Listing> {
  const response = await api.get<Listing>(`/listings/${uuid}`);
  return response.data;
}

export async function updateListing(
  uuid: string,
  data: UpdateListingDto,
): Promise<Listing> {
  const response = await api.patch<Listing>(`/listings/${uuid}`, data);
  return response.data;
}

export async function enhanceListing(uuid: string): Promise<EnhanceResponse> {
  const response = await api.post<EnhanceResponse>(
    `/ai/listings/${uuid}/enhance`,
  );
  return response.data;
}

export async function generateAssets(
  uuid: string,
  data: GenerateAssetsDto,
): Promise<GeneratedAsset[]> {
  const response = await api.post<GeneratedAsset[]>(
    `/ai/listings/${uuid}/generate`,
    data,
  );
  return response.data;
}

export async function getListingAssets(
  uuid: string,
): Promise<GeneratedAsset[]> {
  const response = await api.get<GeneratedAsset[]>(
    `/ai/listings/${uuid}/assets`,
  );
  return response.data;
}

export type RegenerateAssetResult = {
  asset: GeneratedAsset;
  status: number;
};

export async function regenerateAsset(
  uuid: string,
  data: RegenerateAssetDto,
): Promise<RegenerateAssetResult> {
  const response = await api.post<GeneratedAsset>(
    `/ai/assets/${uuid}/regenerate`,
    data,
  );
  return { asset: response.data, status: response.status };
}
