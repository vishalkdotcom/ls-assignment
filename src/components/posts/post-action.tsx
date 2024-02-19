import { Box, IconButton, SvgIcon, Typography } from "@mui/material";

type Props = {
  label: React.ReactNode;
  icon: typeof SvgIcon;
  highlight?: boolean;
  onClick?: () => void;
};

export default function PostAction({
  icon: Icon,
  label,
  highlight,
  onClick,
}: Props) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
      <IconButton
        size="small"
        onClick={onClick}
        color={highlight ? "error" : "default"}
      >
        <Icon fontSize="small" />
      </IconButton>
      <Typography variant="button">{label}</Typography>
    </Box>
  );
}
