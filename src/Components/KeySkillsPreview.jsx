import { Box } from "@mui/material";
import SectionHeading from "./SectionHeading";

// Displays skills as styled tags in the resume preview
function KeySkillsPreview({ skills, accent }) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{ mt: 4, mb: 4 }}
      className="resume-section pdf-keep-together"
    >
      <SectionHeading accent={accent}>
        KEY SKILLS
      </SectionHeading>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.2,
        }}
      >
        {skills.map((skill, index) => (
          <Box
            key={`${skill}-${index}`}
            sx={{
              backgroundColor: `${accent}12`,
              border: `1px solid ${accent}`,
              color: accent,
              borderRadius: 2,
              px: 2,
              py: 0.8,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {skill}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default KeySkillsPreview;