import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid, Stack } from "@mui/material";

import { useCreateListing, useListingFieldLabels } from "../hooks";
import type { CreateListingDto } from "../service/dto/in";
import { AdvancedDetails } from "./AdvancedDetails";
import { AgentNote } from "./AgentNote";
import { Header } from "./Header";
import { PhotoGallery } from "./PhotoGallery";
import { RequiredFields } from "./RequiredFields";
import { initialListingForm, type ListingFormState } from "./listingFormState";
import { GradientButton } from "../../ui";

export function Main() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useCreateListing();
  const {
    propertyTypeOptions,
    orientationOptions,
    conditionOptions,
    heatingOptions,
    dpeGrades,
  } = useListingFieldLabels();

  const formRef = useRef<ListingFormState>(initialListingForm);

  function handleChange(patch: Partial<ListingFormState>) {
    Object.assign(formRef.current, patch);
  }

  async function handleSubmit() {
    const {
      propertyType,
      price,
      address,
      neighborhood,
      surface,
      rooms,
      bedrooms,
      bathrooms,
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
      notes,
      photoUrls,
    } = formRef.current;

    const dto: CreateListingDto = {
      propertyType,
      address,
      price: Number(price),
      surface: Number(surface),
      rooms: Number(rooms),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      hasElevator,
      hasBalcony,
      hasGarden,
      ...(neighborhood && { neighborhood }),
      ...(floor && { floor }),
      ...(orientation && { orientation }),
      ...(hasBalcony &&
        balconySurface && { balconySurface: Number(balconySurface) }),
      ...(hasGarden &&
        gardenSurface && { gardenSurface: Number(gardenSurface) }),
      ...(energyClass && { energyClass }),
      ...(condition && { condition }),
      ...(heatingType && { heatingType }),
      ...(notes && { notes }),
      ...(photoUrls.length > 0 && {
        photos: photoUrls.map((url, position) => ({ url, position })),
      }),
    };

    await mutate(dto);
    navigate("/");
  }

  return (
    <Stack
      spacing={{ xs: 4, sm: 5 }}
      p={{ xs: 2, sm: 4 }}
      maxWidth={1280}
      mx="auto"
      width="100%"
    >
      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      <Header loading={loading} onSubmit={handleSubmit} />
      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={3}>
            <RequiredFields
              initialValues={initialListingForm}
              propertyTypeOptions={propertyTypeOptions}
              onChange={handleChange}
            />
            <PhotoGallery
              initialUrls={initialListingForm.photoUrls}
              onChangeUrls={(photoUrls) => handleChange({ photoUrls })}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={3}>
            <AdvancedDetails
              initialValues={initialListingForm}
              orientationOptions={orientationOptions}
              conditionOptions={conditionOptions}
              heatingOptions={heatingOptions}
              dpeGrades={dpeGrades}
              onChange={handleChange}
            />
          </Stack>
        </Grid>

        <Grid size={12}>
          <Stack spacing={3}>
            <AgentNote
              initialNotes={initialListingForm.notes}
              onNotesChange={(notes) => handleChange({ notes })}
            />

            <Stack direction="row" alignSelf="flex-end" spacing={1.5}>
              <GradientButton
                size="large"
                loading={loading}
                loadingLabel="Creating listing..."
                onClick={handleSubmit}
              >
                Create listing
              </GradientButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
