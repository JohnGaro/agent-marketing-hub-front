import { Fragment, type ReactNode } from "react";
import { Stack } from "@mui/material";
import { SideNav, SIDEBAR_WIDTH_PX } from "../dashboard/SideNav";
import { TopAppBar } from "../dashboard/TopAppBar";
import { MobileBottomNav } from "../dashboard/MobileBottomNav";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Stack direction="row" sx={{ minHeight: "100vh", overflow: "hidden" }}>
        <SideNav />
        <Stack
          component="main"
          flex={1}
          minHeight="100vh"
          ml={{ xs: 0, md: `${SIDEBAR_WIDTH_PX}px` }}
          pb={{ xs: 10, md: 0 }}
        >
          <TopAppBar />
          {children}
        </Stack>
      </Stack>
      <MobileBottomNav />
    </Fragment>
  );
}
