
import { Box, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";

// Displays the resume's professional summary
function ProfessionalSummary({ summary, accent }) {
  if (!summary) return null;

  return (
    <Box mb={4} className="pdf-keep-together">
      <SectionHeading accent={accent}>
        PROFESSIONAL SUMMARY
      </SectionHeading>

      <Typography
        fontSize={13}
        lineHeight={1.8}
        sx={{ whiteSpace: "pre-wrap" }}
      >
        {summary}
      </Typography>
    </Box>
  );
}

export default ProfessionalSummary;
