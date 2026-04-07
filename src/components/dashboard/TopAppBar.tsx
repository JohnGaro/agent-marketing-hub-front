import { AppBar, Toolbar, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { PRIMARY_NAV } from "../../navigation/primaryNavConfig";

function useTitleFromPath(): string {
  const { pathname } = useLocation();
  const match = PRIMARY_NAV.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  return match?.appBarTitle ?? "Agent Marketing Hub";
}

export function TopAppBar() {
  const title = useTitleFromPath();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        zIndex: (t: Theme) => t.zIndex.drawer + 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        color: (t: Theme) => t.palette.estate.onSurface,
        borderBottom: "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 }, py: 1.5 }}
      >
        <Typography variant="h5" color="primary">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
