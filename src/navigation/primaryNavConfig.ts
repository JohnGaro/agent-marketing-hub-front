export type PrimaryNavId = "dashboard" | "newListing";

export type PrimaryNavItemConfig = {
  id: PrimaryNavId;
  label: string;
  appBarTitle: string;
  href: string;
};

export const PRIMARY_NAV: PrimaryNavItemConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    appBarTitle: "Agent Dashboard",
    href: "/",
  },
  {
    id: "newListing",
    label: "New Listing",
    appBarTitle: "New Listing",
    href: "/listing/create",
  },
];

export const DEFAULT_PRIMARY_NAV_ID: PrimaryNavId = PRIMARY_NAV[0].id;
