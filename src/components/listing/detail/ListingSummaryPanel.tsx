import { Stack, Typography } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link } from "react-router-dom";
import type { Listing } from "../service/dto/out";
import { useListingFieldLabels } from "../hooks";
import { ListingFeatureChips } from "./ListingFeatureChips";
import { ListingPriceCard } from "./ListingPriceCard";
import { ListingPhotoGallery } from "./ListingPhotoGallery";

type Props = { listing: Listing };

export function ListingSummaryPanel({ listing }: Props) {
  const { translatePropertyType } = useListingFieldLabels();
  const title = translatePropertyType(listing.propertyType);

  return (
    <Stack spacing={5}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography
            component={Link}
            to="/"
            variant="overline"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            Listings
          </Typography>
          <NavigateNextRoundedIcon
            sx={{ fontSize: 16, color: "text.secondary" }}
          />
          <Typography variant="overline" color="primary">
            Review
          </Typography>
        </Stack>

        <Stack spacing={0.5}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {listing.address}
            {listing.neighborhood ? `, ${listing.neighborhood}` : ""}
          </Typography>
        </Stack>
      </Stack>

      <ListingFeatureChips listing={listing} />

      <ListingPriceCard price={listing.price} />

      <ListingPhotoGallery photos={listing.photos} />
    </Stack>
  );
}
