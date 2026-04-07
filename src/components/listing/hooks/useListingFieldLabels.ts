import { useCallback, useMemo } from "react";
import {
  EnergyClass,
  HeatingType,
  Orientation,
  PropertyCondition,
  PropertyType,
} from "../service/dto/in";

export const PROPERTY_TYPE_OPTIONS = [
  { label: "Apartment", value: PropertyType.Apartment },
  { label: "House", value: PropertyType.House },
  { label: "Studio", value: PropertyType.Studio },
  { label: "Loft", value: PropertyType.Loft },
  { label: "Villa", value: PropertyType.Villa },
] as const;

export const ORIENTATION_OPTIONS = [
  { label: "South (S)", value: Orientation.South },
  { label: "North (N)", value: Orientation.North },
  { label: "East (E)", value: Orientation.East },
  { label: "West (W)", value: Orientation.West },
] as const;

export const CONDITION_OPTIONS = [
  { label: "New", value: PropertyCondition.New },
  { label: "Excellent condition", value: PropertyCondition.Excellent },
  { label: "Needs refreshing", value: PropertyCondition.ToRefresh },
  { label: "Needs renovation", value: PropertyCondition.ToRenovate },
] as const;

export const HEATING_OPTIONS = [
  { label: "Individual gas", value: HeatingType.IndividualGas },
  { label: "Collective gas", value: HeatingType.CollectiveGas },
  { label: "Electric", value: HeatingType.Electric },
  { label: "Heat pump", value: HeatingType.HeatPump },
  { label: "Geothermal", value: HeatingType.Geothermal },
] as const;

export type DpeGradeRow = {
  label: string;
  value: EnergyClass;
  color: string;
  dark?: boolean;
};

export const DPE_GRADES: DpeGradeRow[] = [
  { label: "A", value: EnergyClass.A, color: "#009640" },
  { label: "B", value: EnergyClass.B, color: "#52B134" },
  { label: "C", value: EnergyClass.C, color: "#C1D22C", dark: true },
  { label: "D", value: EnergyClass.D, color: "#F3E500", dark: true },
  { label: "E", value: EnergyClass.E, color: "#F0B400", dark: true },
  { label: "F", value: EnergyClass.F, color: "#EB8100" },
  { label: "G", value: EnergyClass.G, color: "#D32F2F" },
];

export function useListingFieldLabels() {
  const propertyTypeLabels = useMemo(
    () =>
      Object.fromEntries(
        PROPERTY_TYPE_OPTIONS.map((o) => [o.value, o.label]),
      ) as Record<PropertyType, string>,
    [],
  );

  const translatePropertyType = useCallback(
    (propertyType: PropertyType) =>
      propertyTypeLabels[propertyType] ?? propertyType,
    [propertyTypeLabels],
  );

  return {
    translatePropertyType,
    propertyTypeOptions: PROPERTY_TYPE_OPTIONS,
    orientationOptions: ORIENTATION_OPTIONS,
    conditionOptions: CONDITION_OPTIONS,
    heatingOptions: HEATING_OPTIONS,
    dpeGrades: DPE_GRADES,
  };
}
