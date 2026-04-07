import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import { estateColors as c } from "../../../theme/colors";
import { ListingFormTextField } from "../../ui/ListingFormTextField";

type AgentNoteProps = {
  initialNotes: string;
  onNotesChange: (value: string) => void;
};

export function AgentNote({ initialNotes, onNotesChange }: AgentNoteProps) {
  const [notes, setNotes] = useState(initialNotes);
  return (
    <Paper
      elevation={0}
      sx={{ p: 4, borderRadius: 3, bgcolor: c.surfaceContainerLowest }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Box
          sx={{
            width: 6,
            height: 24,
            bgcolor: "#e9c176",
            borderRadius: 2,
          }}
        />
        <Typography variant="h6">Agent notes</Typography>
      </Stack>
      <ListingFormTextField
        fullWidth
        multiline
        rows={5}
        placeholder="Describe the property's main strengths, neighborhood vibe, recent renovations..."
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          onNotesChange(e.target.value);
        }}
        outlinedInputSx={{
          p: 0,
          "& textarea": { p: 2.5 },
        }}
      />
    </Paper>
  );
}
