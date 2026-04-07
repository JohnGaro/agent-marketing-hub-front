import { Alert, Box, Button, Divider, Stack, TextField } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useState } from "react";
import { useUpdateListing } from "../hooks";
import { GradientButton } from "../../ui";

type Props = {
  listingUuid: string;
  description: string;
  onDescriptionChange: (value: string) => void;
};

export function DescriptionEditor({
  listingUuid,
  description,
  onDescriptionChange,
}: Props) {
  const { mutate: update, loading, error } = useUpdateListing();
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSave = async () => {
    try {
      await update(listingUuid, { description });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // ignore — error shown below
    }
  };

  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.estate.surfaceContainerLowest,
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <TextField
        multiline
        minRows={8}
        fullWidth
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder={
          description
            ? ""
            : "Click on Enhance button to generate a new description"
        }
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {saveSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Description saved successfully.
        </Alert>
      )}

      <Divider sx={{ my: 3, opacity: 0.4 }} />

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="text"
          color="primary"
          startIcon={<ContentCopyRoundedIcon />}
          onClick={handleCopy}
          sx={{ fontWeight: 700 }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>

        <GradientButton
          size="medium"
          loading={loading}
          loadingLabel="Saving..."
          onClick={handleSave}
          sx={{ px: 3, py: 1 }}
        >
          Save changes
        </GradientButton>
      </Stack>
    </Box>
  );
}
