
import { Box, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";

// Displays the work experience section of the resume
function WorkExperiencePreview({ workExperience, accent }) {
  if (
    !workExperience.position &&
    !workExperience.company &&
    !workExperience.description &&
    !workExperience.startDate &&
    !workExperience.endDate
  ) {
    return null;
  }

  return (
    <Box
      mb={4}
      className="resume-section pdf-keep-together"
    >
      <SectionHeading accent={accent}>
        WORK EXPERIENCE
      </SectionHeading>

      <Box
        className="resume-entry"
        sx={{
          borderLeft: `3px solid ${accent}`,
          pl: 2,
          py: 0.5,
        }}
      >
        {workExperience.position && (
          <Typography fontWeight="bold" fontSize={15}>
            {workExperience.position}
          </Typography>
        )}

        {workExperience.company && (
          <Typography
            fontSize={13}
            fontWeight={600}
            color="#475569"
            mt={0.5}
          >
            {workExperience.company}
          </Typography>
        )}

        {(workExperience.startDate || workExperience.endDate) && (
          <Typography
            fontSize={12}
            color="#64748b"
            mt={0.5}
          >
            {workExperience.startDate}
            {workExperience.startDate && workExperience.endDate
              ? " â€” "
              : ""}
            {workExperience.endDate}
          </Typography>
        )}

        {workExperience.description && (
          <Typography
            fontSize={13}
            lineHeight={1.8}
            mt={1}
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {workExperience.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default WorkExperiencePreview;
