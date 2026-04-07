import { Box, Stack, Typography } from "@mui/material";

type Props = { price: number };

export function ListingPriceCard({ price }: Props) {
  const formatted = price.toLocaleString("en-US");

  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.estate.surfaceContainerLowest,
        p: 4,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -32,
          right: -32,
          width: 96,
          height: 96,
          borderRadius: "50%",
          bgcolor: (t) => t.palette.estate.primaryFixed,
          opacity: 0.15,
        }}
      />
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.secondary">
          Sale price
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: 900, lineHeight: 1 }}
        >
          {formatted}&nbsp;€
        </Typography>
      </Stack>
    </Box>
  );
}
