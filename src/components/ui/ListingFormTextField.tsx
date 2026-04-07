import { TextField, type TextFieldProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";
import {
  listingFormFieldOutlinedRootSx,
  listingFormFieldSx,
} from "./listingFormFieldStyles";

export type ListingFormTextFieldProps = TextFieldProps & {
  outlinedInputSx?: SystemStyleObject<Theme>;
};

export function ListingFormTextField({
  sx,
  outlinedInputSx,
  ...props
}: ListingFormTextFieldProps) {
  return (
    <TextField
      size="small"
      sx={[
        listingFormFieldSx,
        outlinedInputSx && {
          "& .MuiOutlinedInput-root": {
            ...listingFormFieldOutlinedRootSx,
            ...outlinedInputSx,
          },
        },
        ...(sx == null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
