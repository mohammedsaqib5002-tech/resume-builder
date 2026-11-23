import { Box, Typography, Divider } from "@mui/material";

// Reusable resume section heading with template accent color
function SectionHeading({ children, accent }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 800,
          color: accent,
          letterSpacing: 1.5,
          mb: 1,
        }}
      >
        {children}
      </Typography>

      <Divider
        sx={{
          borderColor: accent,
          borderBottomWidth: 2,
        }}
      />
    </Box>
  );
}

export default SectionHeading;