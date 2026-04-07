import { Stack, Typography } from "@mui/material";
import SquareFootRoundedIcon from "@mui/icons-material/SquareFootRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded";
import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import type { Listing } from "../service/dto/out";

type FeatureChipProps = {
  icon: React.ReactNode;
  label: string;
};

function FeatureChip({ icon, label }: FeatureChipProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        bgcolor: (t) => t.palette.estate.surfaceContainerHigh,
        px: 2,
        py: 1,
        borderRadius: 2,
      }}
    >
      <Stack sx={{ color: "primary.main", fontSize: 18 }}>{icon}</Stack>
      <Typography variant="body2" fontWeight={700}>
        {label}
      </Typography>
    </Stack>
  );
}

type Props = { listing: Listing };

export function ListingFeatureChips({ listing }: Props) {
  const chips: FeatureChipProps[] = [
    {
      icon: <SquareFootRoundedIcon fontSize="small" />,
      label: `${listing.surface} m²`,
    },
    {
      icon: <HomeRoundedIcon fontSize="small" />,
      label: `${listing.rooms} room${listing.rooms !== 1 ? "s" : ""}`,
    },
    {
      icon: <BedRoundedIcon fontSize="small" />,
      label: `${listing.bedrooms} chambre${listing.bedrooms > 1 ? "s" : ""}`,
    },
  ];

  if (listing.floor) {
    chips.push({
      icon: <LayersRoundedIcon fontSize="small" />,
      label: `Floor ${listing.floor}`,
    });
  }

  if (listing.hasElevator) {
    chips.push({
      icon: <ElevatorRoundedIcon fontSize="small" />,
      label: "Elevator",
    });
  }

  if (listing.hasBalcony) {
    chips.push({
      icon: <BalconyRoundedIcon fontSize="small" />,
      label: listing.balconySurface
        ? `Balcony ${listing.balconySurface} m²`
        : "Balcony",
    });
  }

  if (listing.hasGarden) {
    chips.push({
      icon: <GrassRoundedIcon fontSize="small" />,
      label: listing.gardenSurface
        ? `Garden ${listing.gardenSurface} m²`
        : "Garden",
    });
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={1.5}>
      {chips.map((chip) => (
        <FeatureChip key={chip.label} {...chip} />
      ))}
    </Stack>
  );
}
