import {
  Alert,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { Platform } from "../service/dto/in";
import { GradientButton } from "../../ui";

const PLATFORMS: { value: Platform; label: string; Icon: SvgIconComponent }[] = [
  { value: Platform.Portal, label: "Portal", Icon: ArticleRoundedIcon },
  { value: Platform.Instagram, label: "Instagram", Icon: PhotoCameraRoundedIcon },
  { value: Platform.Facebook, label: "Facebook", Icon: GroupsRoundedIcon },
  { value: Platform.Whatsapp, label: "WhatsApp", Icon: ChatRoundedIcon },
];

const LANGS = [
  { value: "fr", label: "French" },
  { value: "en", label: "English" },
  { value: "de", label: "German" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "luxurious", label: "Luxurious" },
  { value: "casual", label: "Casual" },
  { value: "dynamic", label: "Dynamic" },
];

type Props = {
  selectedPlatform: Platform;
  tone: string;
  lang: string;
  loading: boolean;
  error: string | null;
  onPlatformChange: (p: Platform) => void;
  onToneChange: (t: string) => void;
  onLangChange: (l: string) => void;
  onGenerate: () => void;
};

export function ConfigPanel({
  selectedPlatform,
  tone,
  lang,
  loading,
  error,
  onPlatformChange,
  onToneChange,
  onLangChange,
  onGenerate,
}: Props) {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          bgcolor: (t) => t.palette.estate.surfaceContainerLowest,
          borderRadius: 3,
          p: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: "block" }}>
          Target platform
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          {PLATFORMS.map(({ value, label, Icon }) => {
            const active = selectedPlatform === value;
            return (
              <Box
                key={value}
                onClick={() => onPlatformChange(value)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  border: 2,
                  borderColor: active ? "primary.main" : "transparent",
                  bgcolor: active
                    ? (t) => `${t.palette.primary.main}08`
                    : (t) => t.palette.estate.surfaceContainerHighest,
                  color: active ? "primary.main" : "text.secondary",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: (t) => t.palette.estate.primaryFixed,
                    color: "primary.main",
                  },
                }}
              >
                <Icon sx={{ mb: 0.5 }} />
                <Typography variant="caption" fontWeight={active ? 700 : 500} color="inherit">
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: (t) => t.palette.estate.surfaceContainerLowest,
          borderRadius: 3,
          p: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="overline" color="text.secondary">
              Language
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {LANGS.map(({ value, label }) => (
                <Box
                  key={value}
                  onClick={() => onLangChange(value)}
                  sx={{
                    px: 2,
                    py: 0.75,
                    borderRadius: 999,
                    cursor: "pointer",
                    bgcolor:
                      lang === value ? "primary.main" : (t) => t.palette.estate.surfaceContainer,
                    color: lang === value ? "primary.contrastText" : "text.secondary",
                    fontWeight: lang === value ? 700 : 600,
                    fontSize: "0.75rem",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      bgcolor:
                        lang === value
                          ? "primary.dark"
                          : (t) => t.palette.estate.surfaceContainerHigh,
                    },
                  }}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="overline" color="text.secondary">
              Ton de communication
            </Typography>
            <RadioGroup value={tone} onChange={(e) => onToneChange(e.target.value)}>
              {TONES.map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio size="small" />}
                  label={
                    <Typography variant="body2" fontWeight={500}>
                      {label}
                    </Typography>
                  }
                  sx={{
                    mx: 0,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    "&:hover": { bgcolor: (t) => t.palette.estate.surfaceContainerLow },
                  }}
                />
              ))}
            </RadioGroup>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}

          <GradientButton
            fullWidth
            size="large"
            loading={loading}
            loadingLabel="Generating..."
            startIcon={<AutoAwesomeRoundedIcon />}
            onClick={onGenerate}
            sx={{ py: 1.5 }}
          >
            Generate content
          </GradientButton>
        </Stack>
      </Box>
    </Stack>
  );
}
