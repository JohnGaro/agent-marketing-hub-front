import { Avatar, Button, Stack, Typography } from "@mui/material";

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAu36EZU08QNB204NftyMRcvqvt0dwEfVfwh2-VEiosKjivlEvbn23cr4hgt7RzucyuwFgG8a3bO8DwsbU9mD2iUkDV37BSFTrVqWeusiCSZWXIKV30GgmoACCfUnZsVXicGxd88IZWqkdUfF2r1TTJxBryXKMwAcqwwg0ycT48yKVVZqqWEpoQZ--xtHjyvJfsn6dI10zb2bGwtIysFWapxlpuo6UG_d_0x0akW8S9khRRL1VlggU-oGkMBlkMXtsn7MrS9MKe";

export function AgentCard() {
  return (
    <Stack
      mx={2}
      spacing={2}
      p={2}
      borderRadius={2}
      bgcolor={(t) => t.palette.estate.surfaceContainerLow}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          src={AVATAR_SRC}
          alt=""
          sx={{ width: 40, height: 40, border: "2px solid #fff" }}
        />
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography variant="body2" fontWeight={700} noWrap>
            Marcus Thorne
          </Typography>
          <Typography variant="microCaption" color="text.secondary">
            Platinum Agent
          </Typography>
        </Stack>
      </Stack>
      <Button fullWidth variant="contained">
        Upgrade Pro
      </Button>
    </Stack>
  );
}
