import { estateColors as c } from "../../theme/colors";

/** Applied to OutlinedInput root (Select receives sx on the input directly). */
export const listingFormFieldOutlinedRootSx = {
  bgcolor: c.surfaceContainerHighest,
  borderRadius: 1,
  "& fieldset": { border: "none" },
  "&:hover fieldset": { border: "none" },
  "&.Mui-focused fieldset": {
    border: "none",
    borderBottom: `2px solid ${c.primary} !important`,
  },
};

/** TextField: FormControl root, target inner outlined input + label. */
export const listingFormFieldSx = {
  "& .MuiOutlinedInput-root": listingFormFieldOutlinedRootSx,
  "& .MuiInputLabel-root": {
    fontSize: "0.625rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: c.onSurfaceVariant,
  },
};
