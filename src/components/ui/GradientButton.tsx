import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  type ButtonProps,
} from "@mui/material";
import type { ReactNode } from "react";

export type GradientButtonProps = ButtonProps & {
  loading?: boolean;
  loadingLabel?: ReactNode;
};

export function GradientButton({
  sx,
  loading = false,
  loadingLabel,
  children,
  disabled,
  size = "large",
  ...props
}: GradientButtonProps) {
  const spinnerSize = size === "small" ? 20 : 22;

  return (
    <Button
      variant="contained"
      disabled={disabled || loading}
      size={size}
      sx={[
        {
          px: 4,
          py: 2,
          borderRadius: 2,
        },
        ...(sx == null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {loading ? (
        loadingLabel != null ? (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <CircularProgress size={spinnerSize} color="inherit" />
            <Typography variant="body2" color="inherit">
              {loadingLabel}
            </Typography>
          </Stack>
        ) : (
          <CircularProgress size={spinnerSize} color="inherit" />
        )
      ) : (
        children
      )}
    </Button>
  );
}
