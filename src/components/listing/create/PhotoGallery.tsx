import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { estateColors as c } from "../../../theme/colors";

const sectionAccentBar = (color: string) => (
  <Box
    sx={{
      width: 6,
      height: 24,
      bgcolor: color,
      borderRadius: 2,
      flexShrink: 0,
    }}
  />
);

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

type PhotoGalleryProps = {
  initialUrls?: string[];
  onChangeUrls: (urls: string[]) => void;
};

export function PhotoGallery({
  initialUrls = [],
  onChangeUrls,
}: PhotoGalleryProps) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState("");
  const [urlError, setUrlError] = useState(false);

  function handleOpen() {
    setDraftUrl("");
    setUrlError(false);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleAdd() {
    const trimmed = draftUrl.trim();
    if (!trimmed || !isValidHttpUrl(trimmed)) {
      setUrlError(true);
      return;
    }
    const next = [...urls, trimmed];
    setUrls(next);
    onChangeUrls(next);
    handleClose();
  }

  function handleRemove(index: number) {
    const next = urls.filter((_, i) => i !== index);
    setUrls(next);
    onChangeUrls(next);
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: c.surfaceContainerLowest,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          {sectionAccentBar(c.secondary)}
          <Typography variant="h6">Photo gallery</Typography>
        </Stack>
        <Box
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          sx={{
            border: `2px dashed ${c.outlineVariant}`,
            borderRadius: 2,
            p: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: c.surface,
            cursor: "pointer",
            transition: "background-color 0.2s",
            "&:hover": { bgcolor: c.surfaceContainerLow },
            "&:hover .upload-icon-wrapper": { transform: "scale(1.1)" },
          }}
        >
          <Box
            className="upload-icon-wrapper"
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: `${c.secondaryContainer}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              transition: "transform 0.2s",
            }}
          >
            <AddAPhotoRoundedIcon sx={{ color: c.secondary, fontSize: 32 }} />
          </Box>
          <Typography variant="body2" fontWeight={700} mb={0.5}>
            Add a photo URL
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
          >
            Click to open the dialog — technical test (no file upload)
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{
              mt: 3,
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderColor: c.outlineVariant,
              color: "text.secondary",
              borderRadius: 1,
              "&:hover": { bgcolor: `${c.outlineVariant}33` },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            Enter URL
          </Button>
        </Box>
        {urls.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            mt={2}
            useFlexGap
            maxWidth="100%"
          >
            {urls.map((url, index) => (
              <Tooltip title={url} key={`${url}-${index}`} placement="top">
                <Chip
                  key={`${url}-${index}`}
                  label={url}
                  onDelete={() => handleRemove(index)}
                  sx={{ maxWidth: "250px" }}
                />
              </Tooltip>
            ))}
          </Stack>
        )}
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add photo URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            placeholder="https://example.com/photo.jpg"
            value={draftUrl}
            onChange={(e) => {
              setDraftUrl(e.target.value);
              setUrlError(false);
            }}
            error={urlError}
            helperText={
              urlError
                ? "Enter a valid http(s) URL"
                : "Paste a direct link to an image"
            }
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
