import { useCallback } from "react";
import { alpha, type Theme } from "@mui/material/styles";
import { ListingStatus } from "../service/dto/in";

export type ListingStatusChipConfig = {
  label: string;
  bg: (t: Theme) => string;
  color: (t: Theme) => string;
};

const STATUS_CONFIG: Record<ListingStatus, ListingStatusChipConfig> = {
  [ListingStatus.Draft]: {
    label: "DRAFT",
    bg: (t) => alpha(t.palette.estate.secondaryContainer, 0.3),
    color: (t) => t.palette.estate.onSecondaryContainer,
  },
  [ListingStatus.Enhanced]: {
    label: "AI ENHANCED",
    bg: (t) => alpha(t.palette.primary.main, 0.12),
    color: (t) => t.palette.primary.main,
  },
  [ListingStatus.Published]: {
    label: "PUBLISHED",
    bg: (t) => t.palette.estate.green100,
    color: (t) => t.palette.estate.green800,
  },
};

export function useListingStatusConfig() {
  return useCallback((status: ListingStatus): ListingStatusChipConfig => {
    return STATUS_CONFIG[status] ?? STATUS_CONFIG[ListingStatus.Draft];
  }, []);
}
