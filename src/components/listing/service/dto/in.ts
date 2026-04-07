export enum PropertyType {
  Apartment = 'apartment',
  House = 'house',
  Studio = 'studio',
  Loft = 'loft',
  Villa = 'villa',
}

export enum Orientation {
  South = 'south',
  North = 'north',
  East = 'east',
  West = 'west',
}

export enum EnergyClass {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
}

export enum PropertyCondition {
  New = 'new',
  Excellent = 'excellent',
  ToRefresh = 'to_refresh',
  ToRenovate = 'to_renovate',
}

export enum HeatingType {
  IndividualGas = 'individual_gas',
  CollectiveGas = 'collective_gas',
  Electric = 'electric',
  HeatPump = 'heat_pump',
  Geothermal = 'geothermal',
}

export enum Platform {
  Portal = 'portal',
  Instagram = 'instagram',
  Facebook = 'facebook',
  Whatsapp = 'whatsapp',
}

export enum ListingStatus {
  Draft = 'draft',
  Enhanced = 'enhanced',
  Published = 'published',
}

export interface CreateListingPhotoDto {
  url: string;
  caption?: string;
  position?: number;
}

export interface CreateListingDto {
  propertyType: PropertyType;
  address: string;
  neighborhood?: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: string;
  orientation?: Orientation;
  hasElevator?: boolean;
  hasBalcony?: boolean;
  balconySurface?: number;
  hasGarden?: boolean;
  gardenSurface?: number;
  energyClass?: EnergyClass;
  condition?: PropertyCondition;
  heatingType?: HeatingType;
  notes?: string;
  photos?: CreateListingPhotoDto[];
}

export interface UpdateListingDto extends Partial<CreateListingDto> {
  description?: string;
  improvements?: string;
  status?: ListingStatus;
}

export interface GenerateAssetsDto {
  platforms: Platform[];
  tone?: string;
  lang?: string;
}

export interface RegenerateAssetDto {
  tone?: string;
  lang?: string;
}
