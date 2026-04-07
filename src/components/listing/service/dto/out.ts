import type {
  EnergyClass,
  HeatingType,
  ListingStatus,
  Orientation,
  Platform,
  PropertyCondition,
  PropertyType,
} from './in';
import type { Agent } from '../../../dashboard/service/dto/out';

export interface ListingPhoto {
  uuid: string;
  url: string;
  caption: string | null;
  position: number;
  createdAt: string;
}

export interface Listing {
  uuid: string;
  propertyType: PropertyType;
  address: string;
  neighborhood: string | null;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor: string | null;
  orientation: Orientation | null;
  hasElevator: boolean;
  hasBalcony: boolean;
  balconySurface: number | null;
  hasGarden: boolean;
  gardenSurface: number | null;
  energyClass: EnergyClass | null;
  condition: PropertyCondition | null;
  heatingType: HeatingType | null;
  description: string | null;
  improvements: string | null;
  notes: string | null;
  status: ListingStatus;
  photos: ListingPhoto[];
  agent?: Agent;
  createdAt: string;
  updatedAt: string;
}

export interface EnhanceResponse {
  description: string;
  suggestions: string[];
}

export interface GeneratedAsset {
  uuid: string;
  platform: Platform;
  content: string;
  version: number;
  createdAt: string;
  tone: string | null;
  lang: string | null;
}
