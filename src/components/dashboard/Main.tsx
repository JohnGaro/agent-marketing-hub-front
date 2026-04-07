import { Stack } from "@mui/material";
import { DashboardHero } from "./DashboardHero";
import { ActiveListingsSection } from "../listing/list/ActiveListingsSection";

export function Main() {
  return (
    <Stack
      spacing={{ xs: 4, sm: 5 }}
      p={{ xs: 2, sm: 4 }}
      maxWidth={1280}
      mx="auto"
      width="100%"
    >
      <DashboardHero />
      <Stack
        direction={{ xs: "column", xl: "row" }}
        spacing={4}
        alignItems="flex-start"
      >
        <Stack flex={{ xl: "2 1 0" }} minWidth={0} width="100%">
          <ActiveListingsSection />
        </Stack>
        <Stack spacing={3} flex={{ xl: "1 1 0" }} minWidth={0} width="100%" />
      </Stack>
    </Stack>
  );
}
