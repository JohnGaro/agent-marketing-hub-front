import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

type Props = {
  loading: boolean;
  suggestions: string[] | null;
};

function LoadingSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: (t) => `${t.palette.estate.surfaceContainerLowest}80`,
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        backdropFilter: "blur(8px)",
        border: 1,
        borderColor: (t) => `${t.palette.estate.secondary}18`,
      }}
    >
      <Stack spacing={2}>
        <Skeleton variant="text" width="60%" height={28} animation="wave" />
        <Skeleton variant="text" width="100%" height={20} animation="wave" />
        <Skeleton variant="text" width="85%" height={20} animation="wave" />
        <Skeleton variant="text" width="100%" height={20} animation="wave" />
        <Skeleton variant="text" width="80%" height={20} animation="wave" />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        mt={3}
        sx={{ color: "secondary.main", animation: "pulse 2s infinite" }}
      >
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography variant="body2" fontWeight={700}>
          Stylistic analysis in progress...
        </Typography>
      </Stack>
    </Box>
  );
}

function SuggestionsList({ suggestions }: { suggestions: string[] }) {
  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.estate.surfaceContainerLowest,
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        border: 1,
        borderColor: (t) => `${t.palette.estate.secondary}20`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <List dense disablePadding>
        {suggestions.map((suggestion, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ mb: 1.5, alignItems: "flex-start" }}
          >
            <ListItemIcon sx={{ minWidth: 32, mt: 0.25 }}>
              <TipsAndUpdatesRoundedIcon
                fontSize="small"
                sx={{ color: "secondary.main" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={suggestion}
              primaryTypographyProps={{
                variant: "body2",
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export function AiSuggestionPanel({ loading, suggestions }: Props) {
  if (!loading && !suggestions) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <Chip
        label={loading ? "AI suggestion in progress..." : "AI suggestions"}
        size="small"
        sx={{
          position: "absolute",
          top: -14,
          left: 24,
          zIndex: 1,
          bgcolor: (t) => t.palette.estate.secondaryContainer,
          color: (t) => t.palette.estate.onSecondaryContainer,
          fontWeight: 700,
          fontSize: "0.625rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : suggestions && suggestions.length > 0 ? (
        <SuggestionsList suggestions={suggestions} />
      ) : null}
    </Box>
  );
}
