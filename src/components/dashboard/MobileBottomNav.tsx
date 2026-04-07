import type { ReactNode } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link, matchPath, useLocation } from "react-router-dom";

const RESERVED_LISTING_SEGMENTS = new Set(["create"]);

function listingUuidFromPathname(pathname: string): string | undefined {
  const assets = matchPath(
    { path: "/listing/:uuid/assets", end: true },
    pathname,
  );
  if (assets?.params.uuid) return assets.params.uuid;
  const detail = matchPath({ path: "/listing/:uuid", end: true }, pathname);
  const uuid = detail?.params.uuid;
  if (uuid && !RESERVED_LISTING_SEGMENTS.has(uuid)) return uuid;
  return undefined;
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Stack
      component={Link}
      to={href}
      alignItems="center"
      spacing={0.5}
      sx={{
        textAlign: "center",
        color: active
          ? "primary.main"
          : (t) => t.palette.estate.onSurfaceVariant,
        textDecoration: "none",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>{icon}</Box>
      <Typography variant="microCaption" color="inherit">
        {label}
      </Typography>
    </Stack>
  );
}

export function MobileBottomNav() {
  const { pathname } = useLocation();
  const listingUuid = listingUuidFromPathname(pathname);

  return (
    <Stack
      component="nav"
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (t) => t.zIndex.drawer + 2,
        py: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid",
        borderColor: "rgba(196, 197, 214, 0.2)",
      }}
    >
      <NavItem href="/" icon={<DashboardRoundedIcon />} label="Home" active />
      <Box sx={{ mt: -4 }}>
        <IconButton
          sx={{
            width: 56,
            height: 56,
            bgcolor: "primary.main",
            color: "white",
            boxShadow: (t) => `0 10px 15px ${t.palette.primary.main}66`,
            "&:hover": { bgcolor: "primary.dark" },
          }}
          aria-label="add listing"
          component={Link}
          to="/listing/create"
        >
          <AddRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
      {listingUuid ? (
        <NavItem
          href={`/listing/${listingUuid}/assets`}
          icon={<AutoAwesomeRoundedIcon />}
          label="Assets"
        />
      ) : null}
    </Stack>
  );
}
