import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { useListing, useListingAssets, useGenerateAssets } from "../hooks";
import { getListingAssets } from "../service/request";
import { Platform } from "../service/dto/in";
import type { GeneratedAsset } from "../service/dto/out";
import { PropertyBar } from "./PropertyBar";
import { ConfigPanel } from "./ConfigPanel";
import { AssetPreview } from "./AssetPreview";
import { Link } from "react-router-dom";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

type Props = { uuid: string };

type LocalAssetsPatch = {
  serverAnchor: GeneratedAsset[] | null;
  list: GeneratedAsset[];
};

function resolveAssets(
  serverAssets: GeneratedAsset[] | null,
  patch: LocalAssetsPatch | null,
): GeneratedAsset[] {
  if (patch && patch.serverAnchor === serverAssets) {
    return patch.list;
  }
  return serverAssets ?? [];
}

export function Main({ uuid }: Props) {
  const { data: listing, loading: listingLoading, error } = useListing(uuid);
  const { data: serverAssets, loading: assetsLoading } = useListingAssets(uuid);
  const {
    mutate: generate,
    loading: generating,
    error: generateError,
  } = useGenerateAssets();

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platform.Instagram,
  );
  const [tone, setTone] = useState("professional");
  const [lang, setLang] = useState("en");
  const [assetsPatch, setAssetsPatch] = useState<LocalAssetsPatch | null>(null);

  const assets = useMemo(
    () => resolveAssets(serverAssets, assetsPatch),
    [serverAssets, assetsPatch],
  );

  const currentAsset =
    assets.find((a) => a.platform === selectedPlatform) ?? null;

  const handleGenerate = async () => {
    try {
      const result = await generate(uuid, {
        platforms: [selectedPlatform],
        tone,
        lang,
      });
      const base = resolveAssets(serverAssets, assetsPatch);
      setAssetsPatch({
        serverAnchor: serverAssets,
        list: [
          ...base.filter((a) => a.platform !== selectedPlatform),
          ...result,
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssetUpdate = (updated: GeneratedAsset) => {
    const base = resolveAssets(serverAssets, assetsPatch);
    setAssetsPatch({
      serverAnchor: serverAssets,
      list: base.map((a) => (a.uuid === updated.uuid ? updated : a)),
    });
  };

  const refreshListingAssets = useCallback(async () => {
    const list = await getListingAssets(uuid);
    setAssetsPatch({ serverAnchor: serverAssets, list });
  }, [uuid, serverAssets]);

  if (listingLoading || assetsLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="60vh">
        <CircularProgress size={40} />
      </Stack>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!listing) return null;

  return (
    <Box
      sx={{
        pt: { xs: 3, md: 4 },
        pb: 6,
        px: { xs: 2, sm: 4, md: 6 },
        maxWidth: 1600,
        mx: "auto",
        minHeight: "100vh",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0.5} mb={2}>
        <Typography
          component={Link}
          to="/"
          variant="overline"
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { color: "primary.main" },
          }}
        >
          Listings
        </Typography>
        <NavigateNextRoundedIcon
          sx={{ fontSize: 16, color: "text.secondary" }}
        />
        <Typography variant="overline" color="primary">
          Assets
        </Typography>
      </Stack>
      <PropertyBar listing={listing} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <ConfigPanel
          selectedPlatform={selectedPlatform}
          tone={tone}
          lang={lang}
          loading={generating}
          error={generateError}
          onPlatformChange={setSelectedPlatform}
          onToneChange={setTone}
          onLangChange={setLang}
          onGenerate={handleGenerate}
        />
        <AssetPreview
          platform={selectedPlatform}
          asset={currentAsset}
          loading={generating}
          onAssetUpdate={handleAssetUpdate}
          onAssetsRefresh={refreshListingAssets}
        />
      </Box>
    </Box>
  );
}
