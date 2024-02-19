import { Box, IconButton, SvgIcon, Typography } from "@mui/material";

type Props = {
  label: React.ReactNode;
  icon: typeof SvgIcon;
};

export default function PostAction({ icon: Icon, label }: Props) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
      <IconButton size="small">
        <Icon fontSize="small" />
      </IconButton>
      <Typography variant="button">{label}</Typography>
    </Box>
  );
}
