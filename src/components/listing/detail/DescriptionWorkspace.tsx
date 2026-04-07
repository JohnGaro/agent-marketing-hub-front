import { Alert, Box, Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useState } from "react";
import type { Listing } from "../service/dto/out";
import { useEnhanceListing } from "../hooks";
import { GradientButton } from "../../ui";
import { DescriptionEditor } from "./DescriptionEditor";
import { AiSuggestionPanel } from "./AiSuggestionPanel";

type Props = { listing: Listing };

export function DescriptionWorkspace({ listing }: Props) {
  const [description, setDescription] = useState(listing.description ?? "");
  const {
    mutate: enhance,
    loading,
    error,
    data: enhanceResult,
  } = useEnhanceListing();

  const handleEnhance = async () => {
    try {
      const result = await enhance(listing.uuid);
      if (result.description) {
        setDescription(result.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.estate.surfaceContainerLow,
        borderRadius: 4,
        p: { xs: 3, md: 5 },
        minHeight: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={5}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 900 }}>
            AI-optimized listing description
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit the copy yourself or let AI refine the tone for your target
            buyers.
          </Typography>
        </Stack>

        <GradientButton
          size="medium"
          onClick={handleEnhance}
          loading={loading}
          loadingLabel="Analyzing..."
          startIcon={<AutoAwesomeRoundedIcon />}
          sx={{
            bgcolor: (t) => t.palette.estate.secondaryContainer,
            color: (t) => t.palette.estate.onSecondaryContainer,
            backgroundImage: "none",
            "&:hover": {
              bgcolor: (t) => t.palette.estate.secondaryFixed,
              backgroundImage: "none",
            },
            px: 3,
            py: 1.5,
            flexShrink: 0,
          }}
        >
          Enhance with AI
        </GradientButton>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        <DescriptionEditor
          listingUuid={listing.uuid}
          description={description}
          onDescriptionChange={setDescription}
        />

        <AiSuggestionPanel
          loading={loading}
          suggestions={enhanceResult?.suggestions ?? null}
        />
      </Stack>
    </Box>
  );
}
