import { Box, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";

// Displays project details in the resume preview
function ProjectsPreview({ projects, accent }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Box mb={4}>
      <SectionHeading accent={accent}>
        PROJECTS
      </SectionHeading>

      {projects.map((project, index) => (
        <Box
          key={index}
          className="pdf-keep-together"
          sx={{
            mt: 2,
            mb: 3,
            borderLeft: `3px solid ${accent}`,
            pl: 2,
            py: 0.5,
          }}
        >
          {project.name && (
            <Typography fontWeight="bold" fontSize={15}>
              {project.name}
            </Typography>
          )}

          {project.technologies && (
            <Typography
              fontSize={12}
              color="#475569"
              mt={0.5}
            >
              Technologies: {project.technologies}
            </Typography>
          )}

          {project.description && (
            <Typography
              fontSize={13}
              lineHeight={1.8}
              mt={1}
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {project.description}
            </Typography>
          )}

          {project.link && (
            <Typography
              component="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              fontSize={12}
              sx={{
                color: accent,
                overflowWrap: "anywhere",
              }}
            >
              {project.link}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ProjectsPreview;