
import { Box, Typography } from "@mui/material";

// Displays resume owner's name, title, and contact details
function ResumeHeader({ personalInfo, accent }) {
  return (
    <Box
      className="pdf-keep-together"
      sx={{
        borderLeft: `7px solid ${accent}`,
        backgroundColor: `${accent}0D`,
        p: { xs: 2, md: 3 },
        mb: 4,
        borderRadius: "4px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 25, md: 32 },
          fontWeight: 800,
          color: accent,
          letterSpacing: 1,
          overflowWrap: "anywhere",
        }}
      >
        {personalInfo.fullName || "Your Name"}
      </Typography>

      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: "#334155",
          mt: 1,
        }}
      >
        {personalInfo.jobTitle || "Professional Title"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
        }}
      >
        {personalInfo.email && (
          <Typography fontSize={12}>
            Email: {personalInfo.email}
          </Typography>
        )}

        {personalInfo.phone && (
          <Typography fontSize={12}>
            Phone: {personalInfo.phone}
          </Typography>
        )}

        {personalInfo.address && (
          <Typography fontSize={12}>
            Location: {personalInfo.address}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ResumeHeader;
