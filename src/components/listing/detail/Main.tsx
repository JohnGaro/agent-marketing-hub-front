import { Alert, Box, CircularProgress, Grid, Stack } from "@mui/material";
import { useListing } from "../hooks";
import { ListingSummaryPanel } from "./ListingSummaryPanel";
import { DescriptionWorkspace } from "./DescriptionWorkspace";

type Props = { uuid: string };

export function Main({ uuid }: Props) {
  const { data: listing, loading, error } = useListing(uuid);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="60vh">
        <CircularProgress size={40} />
      </Stack>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!listing) return null;

  return (
    <Box
      sx={{
        pt: { xs: 3, md: 4 },
        pb: 6,
        px: { xs: 2, sm: 4, md: 6 },
        maxWidth: 1600,
        mx: "auto",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={{ xs: 4, lg: 8 }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <ListingSummaryPanel listing={listing} />
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <DescriptionWorkspace listing={listing} />
        </Grid>
      </Grid>
    </Box>
  );
}
