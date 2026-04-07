import { Select, type SelectProps } from "@mui/material";
import { listingFormFieldOutlinedRootSx } from "./listingFormFieldStyles";

export function ListingFormSelect<T = unknown>({
  sx,
  ...props
}: SelectProps<T>) {
  return (
    <Select<T>
      sx={[
        listingFormFieldOutlinedRootSx,
        ...(sx == null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
