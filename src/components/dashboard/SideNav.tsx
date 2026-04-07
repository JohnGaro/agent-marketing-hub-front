import { Stack, Typography } from "@mui/material";
import { AgentCard } from "./AgentCard";
import { SideNavItem } from "../ui";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import type { ReactNode } from "react";
import {
  PRIMARY_NAV,
  type PrimaryNavId,
} from "../../navigation/primaryNavConfig";

const SIDEBAR_WIDTH = 260;

const NAV_ICONS: Record<PrimaryNavId, ReactNode> = {
  dashboard: <DashboardRoundedIcon />,
  newListing: <AddBoxRoundedIcon />,
};

export function SideNav() {
  return (
    <Stack
      component="aside"
      direction="column"
      display={{ xs: "none", md: "flex" }}
      position="fixed"
      left={0}
      top={0}
      height="100vh"
      width={SIDEBAR_WIDTH}
      py={4}
      bgcolor={(t) => t.palette.estate.slate50}
      borderRight="1px solid"
      borderColor="rgba(196, 197, 214, 0.1)"
      zIndex={(t) => t.zIndex.drawer}
    >
      <Stack spacing={0.5} sx={{ px: 3, mb: 5 }}>
        <Typography variant="brandMark" color="primary">
          Agent Marketing Hub
        </Typography>
        <Typography variant="sideCaption" color="text.secondary">
          Lorem ipsum dolor sit
        </Typography>
      </Stack>

      <Stack
        component="nav"
        spacing={1}
        sx={{ flex: 1, px: 2, overflow: "auto" }}
      >
        {PRIMARY_NAV.map((item) => (
          <SideNavItem
            key={item.id}
            href={item.href}
            end={item.href === "/"}
            icon={NAV_ICONS[item.id]}
            label={item.label}
          />
        ))}
      </Stack>
      <AgentCard />
    </Stack>
  );
}

export const SIDEBAR_WIDTH_PX = SIDEBAR_WIDTH;
