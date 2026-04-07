import {
  Alert,
  Box,
  Button,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { useState } from "react";
import { Platform } from "../service/dto/in";
import type { GeneratedAsset } from "../service/dto/out";
import { useRegenerateAsset } from "../hooks";
import { GradientButton } from "../../ui";

const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; Icon: SvgIconComponent }
> = {
  [Platform.Portal]: { label: "Portal listing", Icon: ArticleRoundedIcon },
  [Platform.Instagram]: {
    label: "Post Instagram",
    Icon: PhotoCameraRoundedIcon,
  },
  [Platform.Facebook]: { label: "Post Facebook", Icon: GroupsRoundedIcon },
  [Platform.Whatsapp]: { label: "Message WhatsApp", Icon: ChatRoundedIcon },
};

function ContentSkeleton() {
  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Skeleton variant="text" width="70%" height={28} animation="wave" />
      <Skeleton variant="text" width="100%" height={20} animation="wave" />
      <Skeleton variant="text" width="90%" height={20} animation="wave" />
      <Skeleton variant="text" width="100%" height={20} animation="wave" />
      <Skeleton variant="text" width="80%" height={20} animation="wave" />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        pt={1}
        sx={{ color: "secondary.main" }}
      >
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography variant="body2" fontWeight={700}>
          Generating...
        </Typography>
      </Stack>
    </Stack>
  );
}

type Props = {
  platform: Platform;
  asset: GeneratedAsset | null;
  loading: boolean;
  onAssetUpdate: (updated: GeneratedAsset) => void;
  onAssetsRefresh?: () => Promise<void>;
};

export function AssetPreview({
  platform,
  asset,
  loading,
  onAssetUpdate,
  onAssetsRefresh,
}: Props) {
  const [copied, setCopied] = useState(false);
  const {
    mutate: regenerate,
    loading: regenerating,
    error,
  } = useRegenerateAsset();
  const { label, Icon } = PLATFORM_CONFIG[platform];

  const handleCopy = async () => {
    if (!asset) return;
    try {
      await navigator.clipboard.writeText(asset.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleRegenerate = async () => {
    if (!asset) return;
    try {
      const result = await regenerate(asset.uuid, {});
      if (result.status === 201 && onAssetsRefresh) {
        await onAssetsRefresh();
      } else {
        onAssetUpdate(result.asset);
      }
    } catch {
      // error shown below
    }
  };

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          bgcolor: (t) => t.palette.estate.surfaceContainerLowest,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 4, py: 2.5, borderBottom: 1, borderColor: "divider" }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: (t) => `${t.palette.primary.main}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
              }}
            >
              <Icon />
            </Box>
            <Stack spacing={0}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ lineHeight: 1.4 }}
              >
                Content preview
              </Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                {label}
              </Typography>
            </Stack>
          </Stack>

          {asset && (
            <Chip
              label={`v${asset.version}`}
              size="small"
              sx={{
                bgcolor: (t) => t.palette.estate.surfaceContainerHighest,
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            />
          )}
        </Stack>

        <Box sx={{ p: 4, minHeight: 300 }}>
          {loading ? (
            <ContentSkeleton />
          ) : asset ? (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  bgcolor: (t) => t.palette.estate.surfaceContainerLow,
                  borderRadius: 2,
                  p: 4,
                  minHeight: 240,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}
                >
                  {asset.content}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 16,
                  bgcolor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {asset.content.length} characters
                </Typography>
              </Box>
            </Box>
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              height={240}
              spacing={1}
            >
              <Typography variant="body1" color="text.secondary">
                No content generated for this platform yet.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Adjust the settings on the left and click &quot;Generate
                content&quot;.
              </Typography>
            </Stack>
          )}
        </Box>

        {error && (
          <Box sx={{ px: 4, pb: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        <Box
          sx={{
            px: 4,
            py: 3,
            bgcolor: (t) => `${t.palette.estate.surfaceContainerLow}80`,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            startIcon={<HistoryRoundedIcon />}
            onClick={handleRegenerate}
            disabled={!asset || regenerating}
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Regenerate
          </Button>

          <Stack direction="row" spacing={2}>
            <GradientButton
              size="medium"
              startIcon={<ContentCopyRoundedIcon />}
              onClick={handleCopy}
              disabled={!asset}
              sx={{ px: 3 }}
            >
              {copied ? "Copied!" : "Copy text"}
            </GradientButton>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
