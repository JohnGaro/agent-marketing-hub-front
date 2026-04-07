import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { estateColors as c } from "../../../theme/colors";
import { PropertyType } from "../service/dto/in";
import { ListingFormSelect } from "../../ui/ListingFormSelect";
import { ListingFormTextField } from "../../ui/ListingFormTextField";
import type { ListingFormState } from "./listingFormState";

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

type PropertyTypeOption = { value: PropertyType; label: string };

type RequiredFieldsState = Pick<
  ListingFormState,
  | "propertyType"
  | "price"
  | "address"
  | "neighborhood"
  | "surface"
  | "rooms"
  | "bedrooms"
  | "bathrooms"
>;

type RequiredFieldsProps = {
  initialValues: RequiredFieldsState;
  propertyTypeOptions: readonly PropertyTypeOption[];
  onChange: (patch: Partial<ListingFormState>) => void;
};

export function RequiredFields({
  initialValues,
  propertyTypeOptions,
  onChange,
}: RequiredFieldsProps) {
  const [fields, setFields] = useState<RequiredFieldsState>(initialValues);
  const {
    propertyType,
    price,
    address,
    neighborhood,
    surface,
    rooms,
    bedrooms,
    bathrooms,
  } = fields;
  const [formattedPrice, setFormattedPrice] = useState(price);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    update("price", raw);
    setFormattedPrice(
      raw ? new Intl.NumberFormat("fr-FR").format(Number(raw)) : "",
    );
  }

  function update<K extends keyof RequiredFieldsState>(
    key: K,
    value: RequiredFieldsState[K],
  ) {
    setFields((f) => ({ ...f, [key]: value }));
    onChange({ [key]: value });
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: c.surfaceContainerLowest,
        "&:hover": { boxShadow: 4 },
        transition: "box-shadow 0.2s",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={4}>
        {sectionAccentBar(c.primary)}
        <Typography variant="h6">Required fields</Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={0.75}>
            <FormControl fullWidth>
              <InputLabel id="property-type-label">Property type</InputLabel>
              <ListingFormSelect
                labelId="property-type-label"
                label="Property type"
                value={propertyType}
                onChange={(e) =>
                  update("propertyType", e.target.value as PropertyType)
                }
                size="small"
              >
                {propertyTypeOptions.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </ListingFormSelect>
            </FormControl>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Price"
            type="text"
            placeholder="550000"
            value={formattedPrice}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      EUR
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={12}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Full address"
            placeholder="12 Peace Street, New York, NY 10001"
            value={address}
            onChange={(e) => update("address", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Quartier"
            placeholder="Le Marais"
            value={neighborhood}
            onChange={(e) => update("neighborhood", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Living area"
            type="number"
            placeholder="85"
            value={surface}
            onChange={(e) => update("surface", e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      m²
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={4}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Rooms"
            type="number"
            value={rooms}
            onChange={(e) => update("rooms", e.target.value)}
            slotProps={{
              htmlInput: { style: { textAlign: "center" } },
            }}
          />
        </Grid>
        <Grid size={4}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => update("bedrooms", e.target.value)}
            slotProps={{
              htmlInput: { style: { textAlign: "center" } },
            }}
          />
        </Grid>
        <Grid size={4}>
          <ListingFormTextField
            fullWidth
            size="small"
            label="Bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => update("bathrooms", e.target.value)}
            slotProps={{
              htmlInput: { style: { textAlign: "center" } },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
