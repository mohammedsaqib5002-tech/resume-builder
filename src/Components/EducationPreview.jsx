
import { Box, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";

// Displays the education section of the resume
function EducationPreview({ education, accent }) {
  if (
    !education.degree &&
    !education.institution &&
    !education.startYear &&
    !education.endYear
  ) {
    return null;
  }

  return (
    <Box
      mb={4}
      className="resume-section pdf-keep-together"
    >
      <SectionHeading accent={accent}>
        EDUCATION
      </SectionHeading>

      <Box
        className="resume-entry"
        sx={{
          borderLeft: `3px solid ${accent}`,
          pl: 2,
          py: 0.5,
        }}
      >
        {education.degree && (
          <Typography fontWeight="bold" fontSize={15}>
            {education.degree}
          </Typography>
        )}

        {education.institution && (
          <Typography
            fontSize={13}
            color="#475569"
            mt={0.5}
          >
            {education.institution}
          </Typography>
        )}

        {(education.startYear || education.endYear) && (
          <Typography
            fontSize={12}
            color="#64748b"
            mt={0.5}
          >
            {education.startYear}
            {education.startYear && education.endYear
              ? " â€” "
              : ""}
            {education.endYear}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default EducationPreview;
