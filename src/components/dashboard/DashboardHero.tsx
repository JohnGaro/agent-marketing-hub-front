import { Stack, Typography } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { GradientButton } from "../ui";
import { useNavigate } from "react-router-dom";

export function DashboardHero() {
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", lg: "center" }}
      spacing={3}
    >
      <Stack spacing={1} sx={{ maxWidth: { xs: "100%", sm: 420 } }}>
        <Typography variant="h3">Welcome back, Marcus.</Typography>
        <Typography variant="body1" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </Typography>
      </Stack>
      <GradientButton
        size="large"
        startIcon={<AddCircleRoundedIcon sx={{ fontSize: 28 }} />}
        onClick={() => navigate("/listing/create")}
      >
        New Listing
      </GradientButton>
    </Stack>
  );
}
