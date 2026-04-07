import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { ListingCard } from "../../dashboard/ListingCard";
import { useListings } from "../hooks";

export function ActiveListingsSection() {
  const { data: listings, loading, error } = useListings();

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography variant="h5">Active Listings</Typography>
      </Stack>

      {loading && (
        <Stack alignItems="center" py={6}>
          <CircularProgress size={32} />
        </Stack>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && listings && (
        <Stack spacing={2}>
          {listings.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              py={4}
            >
              No listings yet.
            </Typography>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing.uuid} listing={listing} />
            ))
          )}
        </Stack>
      )}
    </Stack>
  );
}
