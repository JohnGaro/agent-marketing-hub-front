import { Box, Grid, Stack, Typography } from "@mui/material";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import type { ListingPhoto } from "../service/dto/out";

type Props = { photos: ListingPhoto[] };

const THUMB_HEIGHT = 192;
const HERO_HEIGHT = 360;

function PhotoBox({
  src,
  alt,
  height,
  overlay,
}: {
  src: string;
  alt: string;
  height: number;
  overlay?: string;
}) {
  return (
    <Box
      sx={{
        height,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        bgcolor: (t) => t.palette.estate.surfaceContainer,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s",
          "&:hover": { transform: "scale(1.04)" },
        }}
      />
      {overlay && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0, 37, 135, 0.45)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="white" fontWeight={700}>
            {overlay}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function EmptyGallery() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: HERO_HEIGHT,
        borderRadius: 3,
        bgcolor: (t) => t.palette.estate.surfaceContainer,
      }}
    >
      <ImageRoundedIcon sx={{ fontSize: 56, opacity: 0.2 }} />
      <Typography variant="body2" color="text.secondary" mt={1}>
        No photos
      </Typography>
    </Stack>
  );
}

export function ListingPhotoGallery({ photos }: Props) {
  if (!photos || photos.length === 0) return <EmptyGallery />;

  const [hero, second, third, ...rest] = photos;
  const extraCount = rest.length + 1;

  return (
    <Stack spacing={2}>
      <PhotoBox
        src={hero.url}
        alt={hero.caption ?? "Main photo"}
        height={HERO_HEIGHT}
      />

      {(second || third) && (
        <Grid container spacing={2}>
          {second && (
            <Grid size={6}>
              <PhotoBox
                src={second.url}
                alt={second.caption ?? "Photo 2"}
                height={THUMB_HEIGHT}
              />
            </Grid>
          )}
          {third && (
            <Grid size={6}>
              <PhotoBox
                src={third.url}
                alt={third.caption ?? "Photo 3"}
                height={THUMB_HEIGHT}
                overlay={extraCount > 0 ? `+${extraCount} photos` : undefined}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Stack>
  );
}
