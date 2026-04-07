import {
  EnergyClass,
  HeatingType,
  Orientation,
  PropertyCondition,
  PropertyType,
} from "../service/dto/in";

export type ListingFormState = {
  propertyType: PropertyType;
  price: string;
  address: string;
  neighborhood: string;
  surface: string;
  rooms: string;
  bedrooms: string;
  bathrooms: string;
  floor: string;
  orientation: Orientation | "";
  hasElevator: boolean;
  hasBalcony: boolean;
  balconySurface: string;
  hasGarden: boolean;
  gardenSurface: string;
  energyClass: EnergyClass;
  condition: PropertyCondition | "";
  heatingType: HeatingType | "";
  notes: string;
  photoUrls: string[];
};

export const initialListingForm: ListingFormState = {
  propertyType: PropertyType.Apartment,
  price: "",
  address: "",
  neighborhood: "",
  surface: "",
  rooms: "3",
  bedrooms: "2",
  bathrooms: "1",
  floor: "",
  orientation: "",
  hasElevator: true,
  hasBalcony: false,
  balconySurface: "",
  hasGarden: false,
  gardenSurface: "",
  energyClass: EnergyClass.C,
  condition: "",
  heatingType: "",
  notes: "",
  photoUrls: [],
};
