import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import type { Listing } from "../listing/service/dto/out";
import {
  useListingFieldLabels,
  useListingStatusConfig,
} from "../listing/hooks";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Link } from "react-router-dom";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&q=60";

type ListingCardProps = { listing: Listing };

export function ListingCard({ listing }: ListingCardProps) {
  const { translatePropertyType } = useListingFieldLabels();
  const statusConfig = useListingStatusConfig();
  const photo = listing.photos?.[0];
  const imgSrc = photo?.url ?? PLACEHOLDER_IMG;
  const imgAlt =
    photo?.caption ?? `${listing.propertyType} – ${listing.address}`;
  const title = translatePropertyType(listing.propertyType);
  const cfg = statusConfig(listing.status);

  const detailHref = `/listing/${listing.uuid}`;
  const assetsHref = `${detailHref}/assets`;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={3}
      p={2}
      borderRadius={2}
      bgcolor={(t) => t.palette.estate.surfaceContainerLow}
      sx={{
        overflow: "hidden",
        transition: "background-color 0.2s",
        "&:hover": { bgcolor: (t) => t.palette.estate.surfaceContainer },
        "&:hover .listing-img": { transform: "scale(1.05)" },
      }}
    >
      <Box
        component={Link}
        to={detailHref}
        sx={{
          width: { xs: "100%", md: 192 },
          height: 128,
          flexShrink: 0,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (t) => t.palette.estate.surfaceContainer,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {photo ? (
          <Box
            component="img"
            className="listing-img"
            src={imgSrc}
            alt={imgAlt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s",
            }}
          />
        ) : (
          <HomeRoundedIcon sx={{ fontSize: 48, opacity: 0.25 }} />
        )}
      </Box>

      <Stack
        sx={{ flex: 1, minWidth: 0 }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box
          component={Link}
          to={detailHref}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Stack spacing={0.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography variant="h6">{title}</Typography>
              <Chip
                label={cfg.label}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  bgcolor: cfg.bg,
                  color: cfg.color,
                }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {listing.address}
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "flex-end" }}
          justifyContent="space-between"
          spacing={2}
          useFlexGap
        >
          <Box
            component={Link}
            to={detailHref}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={4}
              flexWrap="wrap"
              useFlexGap
            >
              {(
                [
                  ["Price", `${listing.price.toLocaleString("en-US")} €`],
                  ["Area", `${listing.surface} m²`],
                  ["Rooms", String(listing.rooms)],
                ] as const
              ).map(([k, v]) => (
                <Stack key={k} alignItems="center" spacing={0.25}>
                  <Typography variant="metricLabel">{k}</Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {v}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Button
            component={Link}
            to={assetsHref}
            variant="outlined"
            size="small"
            startIcon={<AutoAwesomeRoundedIcon />}
            sx={{
              flexShrink: 0,
              alignSelf: { xs: "stretch", sm: "auto" },
              whiteSpace: "nowrap",
            }}
          >
            Social assets
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
