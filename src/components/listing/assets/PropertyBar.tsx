import { Box, Chip, Stack, Typography } from "@mui/material";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import SquareFootRoundedIcon from "@mui/icons-material/SquareFootRounded";
import type { Listing } from "../service/dto/out";
import { useListingFieldLabels } from "../hooks";

type Props = { listing: Listing };

export function PropertyBar({ listing }: Props) {
  const { translatePropertyType } = useListingFieldLabels();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <Box
      sx={{
        mb: 4,
        pb: 3,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          {translatePropertyType(listing.propertyType)} — {listing.address}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
            {formattedPrice}
          </Typography>
          {listing.neighborhood && (
            <>
              <Typography color="text.disabled">|</Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
                {listing.neighborhood}
              </Typography>
            </>
          )}
        </Stack>
      </Stack>

      <Stack direction="row" gap={1.5}>
        <Chip
          icon={<BedRoundedIcon />}
          label={`${listing.bedrooms} bed${listing.bedrooms !== 1 ? "s" : ""}`}
          size="small"
          sx={{ bgcolor: (t) => t.palette.estate.surfaceContainerLow, fontWeight: 600 }}
        />
        <Chip
          icon={<SquareFootRoundedIcon />}
          label={`${listing.surface} m²`}
          size="small"
          sx={{ bgcolor: (t) => t.palette.estate.surfaceContainerLow, fontWeight: 600 }}
        />
      </Stack>
    </Box>
  );
}
