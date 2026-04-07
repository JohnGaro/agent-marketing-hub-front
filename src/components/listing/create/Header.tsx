import { Box, Stack, Typography } from "@mui/material";
import { GradientButton } from "../../ui";

type HeaderProps = {
  loading: boolean;
  onSubmit: () => void;
};

export function Header({ loading, onSubmit }: HeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "flex-end" }}
      justifyContent="space-between"
      spacing={2}
    >
      <Box>
        <Typography
          variant="overline"
          color="primary"
          sx={{ display: "block", mb: 0.5 }}
        >
          Agent Marketing Hub
        </Typography>
        <Typography variant="h3" color="text.primary">
          New listing — Property details
        </Typography>
      </Box>
      <Stack direction="row" spacing={1.5}>
        <GradientButton
          size="small"
          loading={loading}
          loadingLabel="Creating listing..."
          onClick={onSubmit}
        >
          Create Listing
        </GradientButton>
      </Stack>
    </Stack>
  );
}
