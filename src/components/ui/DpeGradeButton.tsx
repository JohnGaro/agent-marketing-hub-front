import { Button, type ButtonProps } from "@mui/material";
import { estateColors as c } from "../../theme/colors";

export type DpeGradeButtonProps = Omit<ButtonProps, "color"> & {
  gradeBgColor: string;
  darkText?: boolean;
  selected: boolean;
};

export function DpeGradeButton({
  gradeBgColor,
  darkText = false,
  selected,
  sx,
  children,
  ...props
}: DpeGradeButtonProps) {
  return (
    <Button
      sx={[
        {
          flex: 1,
          minWidth: 0,
          bgcolor: gradeBgColor,
          color: darkText ? c.onBackground : "#fff",
          fontWeight: 700,
          fontSize: "0.75rem",
          borderRadius: 1,
          py: 1.5,
          outline: selected ? `2px solid ${c.primary}` : "none",
          outlineOffset: 2,
          transform: selected ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.15s",
          "&:hover": {
            bgcolor: gradeBgColor,
            opacity: 0.88,
            transform: "scale(1.07)",
          },
        },
        ...(sx == null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Button>
  );
}
