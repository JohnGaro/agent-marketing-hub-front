import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded";
import DeckRoundedIcon from "@mui/icons-material/DeckRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import { estateColors as c } from "../../../theme/colors";
import {
  EnergyClass,
  HeatingType,
  Orientation,
  PropertyCondition,
} from "../service/dto/in";
import type { DpeGradeRow } from "../hooks/useListingFieldLabels";
import { DpeGradeButton } from "../../ui/DpeGradeButton";
import { ListingFormSelect } from "../../ui/ListingFormSelect";
import { ListingFormTextField } from "../../ui/ListingFormTextField";
import type { ListingFormState } from "./listingFormState";

type AdvancedDetailsState = Pick<
  ListingFormState,
  | "floor"
  | "orientation"
  | "hasElevator"
  | "hasBalcony"
  | "balconySurface"
  | "hasGarden"
  | "gardenSurface"
  | "energyClass"
  | "condition"
  | "heatingType"
>;

export type AdvancedDetailsProps = {
  initialValues: AdvancedDetailsState;
  orientationOptions: readonly { label: string; value: Orientation }[];
  conditionOptions: readonly { label: string; value: PropertyCondition }[];
  heatingOptions: readonly { label: string; value: HeatingType }[];
  dpeGrades: DpeGradeRow[];
  onChange: (patch: Partial<ListingFormState>) => void;
};

export function AdvancedDetails({
  initialValues,
  orientationOptions,
  conditionOptions,
  heatingOptions,
  dpeGrades,
  onChange,
}: AdvancedDetailsProps) {
  const [fields, setFields] = useState<AdvancedDetailsState>(initialValues);

  function update<K extends keyof AdvancedDetailsState>(
    key: K,
    value: AdvancedDetailsState[K],
  ) {
    setFields((f) => ({ ...f, [key]: value }));
    onChange({ [key]: value });
  }

  const {
    floor,
    orientation,
    hasElevator,
    hasBalcony,
    balconySurface,
    hasGarden,
    gardenSurface,
    energyClass,
    condition,
    heatingType,
  } = fields;
  return (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        sx={{ px: 3, py: 1.5 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack
            width={6}
            height={24}
            bgcolor={c.onSurfaceVariant}
            borderRadius={2}
            sx={{ opacity: 0.3 }}
          />
          <Typography variant="h6">Advanced details</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ListingFormTextField
              fullWidth
              size="small"
              label="Floor / Total"
              placeholder="3/7"
              value={floor}
              onChange={(e) => update("floor", e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={0.75}>
              <FormControl fullWidth size="small">
                <InputLabel id="orientation-label" shrink>
                  Orientation
                </InputLabel>
                <ListingFormSelect
                  labelId="orientation-label"
                  value={orientation}
                  onChange={(e) =>
                    update("orientation", e.target.value as Orientation)
                  }
                  displayEmpty
                >
                  <MenuItem value={undefined}>—</MenuItem>
                  {orientationOptions.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </ListingFormSelect>
              </FormControl>
            </Stack>
          </Grid>

          <Grid size={12}>
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ p: 1.5, borderRadius: 2, bgcolor: c.surface }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <ElevatorRoundedIcon sx={{ color: c.onSurfaceVariant }} />
                  <Typography variant="body2" fontWeight={500}>
                    Elevator
                  </Typography>
                </Stack>
                <Switch
                  checked={hasElevator}
                  onChange={(e) => update("hasElevator", e.target.checked)}
                  size="small"
                />
              </Stack>

              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: c.surface }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={hasBalcony ? 1.5 : 0}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <DeckRoundedIcon sx={{ color: c.onSurfaceVariant }} />
                    <Typography variant="body2" fontWeight={500}>
                      Balcony / terrace
                    </Typography>
                  </Stack>
                  <Switch
                    checked={hasBalcony}
                    onChange={(e) => update("hasBalcony", e.target.checked)}
                    size="small"
                  />
                </Stack>
                {hasBalcony && (
                  <ListingFormTextField
                    fullWidth
                    size="small"
                    placeholder="Terrace area (m²)"
                    type="number"
                    value={balconySurface}
                    onChange={(e) => update("balconySurface", e.target.value)}
                    outlinedInputSx={{ bgcolor: "#fff" }}
                  />
                )}
              </Box>

              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: c.surface }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={hasGarden ? 1.5 : 0}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <ParkRoundedIcon sx={{ color: c.onSurfaceVariant }} />
                    <Typography variant="body2" fontWeight={500}>
                      Garden
                    </Typography>
                  </Stack>
                  <Switch
                    checked={hasGarden}
                    onChange={(e) => update("hasGarden", e.target.checked)}
                    size="small"
                  />
                </Stack>
                {hasGarden && (
                  <ListingFormTextField
                    fullWidth
                    size="small"
                    placeholder="Garden area (m²)"
                    type="number"
                    value={gardenSurface}
                    onChange={(e) => update("gardenSurface", e.target.value)}
                    outlinedInputSx={{ bgcolor: "#fff" }}
                  />
                )}
              </Box>
            </Stack>
          </Grid>

          <Grid size={12}>
            <Typography
              variant="metricLabel"
              sx={{ display: "block", mb: 1.5 }}
            >
              Energy rating (EPC)
            </Typography>
            <Stack direction="row" spacing={1}>
              {dpeGrades.map(({ label, value, color, dark }) => (
                <DpeGradeButton
                  key={label}
                  gradeBgColor={color}
                  darkText={dark}
                  selected={energyClass === value}
                  onClick={() => update("energyClass", value)}
                >
                  {label}
                </DpeGradeButton>
              ))}
            </Stack>
          </Grid>

          <Grid size={12}>
            <Stack spacing={0.75}>
              <Typography variant="metricLabel">General condition</Typography>
              <FormControl fullWidth size="small">
                <ListingFormSelect
                  value={condition}
                  onChange={(e) =>
                    update("condition", e.target.value as PropertyCondition)
                  }
                  displayEmpty
                >
                  <MenuItem value="">—</MenuItem>
                  {conditionOptions.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </ListingFormSelect>
              </FormControl>
            </Stack>
          </Grid>

          <Grid size={12}>
            <Stack spacing={0.75}>
              <Typography variant="metricLabel">Heating type</Typography>
              <FormControl fullWidth size="small">
                <ListingFormSelect
                  value={heatingType}
                  onChange={(e) =>
                    update("heatingType", e.target.value as HeatingType)
                  }
                  displayEmpty
                >
                  <MenuItem value="">—</MenuItem>
                  {heatingOptions.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </ListingFormSelect>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
