import { Stack, Typography, type StackProps } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type SideNavItemProps = Omit<
  StackProps<typeof NavLink>,
  "children" | "direction" | "alignItems" | "spacing" | "component" | "to"
> & {
  href: string;
  end?: boolean;
  icon: ReactNode;
  label: string;
};

export function SideNavItem({
  href,
  end = false,
  icon,
  label,
  sx,
  ...stackProps
}: SideNavItemProps) {
  return (
    <Stack
      component={NavLink}
      to={href}
      end={end}
      direction="row"
      alignItems="center"
      spacing={1.5}
      px={2}
      py={1.5}
      borderRadius={1}
      sx={[
        {
          textDecoration: "none",
          borderLeft: "4px solid transparent",
          borderLeftColor: "transparent",
          color: (t) => t.palette.estate.slate500,
          transition: "background-color 0.2s, color 0.2s",
          '&[aria-current="page"]': {
            color: "primary.main",
            borderLeftColor: "primary.main",
          },
          "&:hover": {
            bgcolor: (t) => t.palette.estate.slate200,
          },
          "& .MuiSvgIcon-root": { fontSize: 22 },
        },
        ...(sx == null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...stackProps}
    >
      {icon}
      <Typography component="span" variant="navLabel">
        {label}
      </Typography>
    </Stack>
  );
}
