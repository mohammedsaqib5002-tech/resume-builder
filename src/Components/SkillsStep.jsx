import { Typography, TextField, Box, Chip } from "@mui/material";

// Reusable Skills form step.
function SkillsStep({ register, skillsValue = "" }) {
  const skills = skillsValue
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Key Skills
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Enter your skills separated by commas.
      </Typography>

      <TextField
        fullWidth
        label="Skills"
        placeholder="React, JavaScript, HTML, CSS"
        {...register("skills")}
        sx={{ mb: 2 }}
      />

      <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
        {skills.map((skill, index) => (
          <Chip
            key={`${skill}-${index}`}
            label={skill}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </>
  );
}

export default SkillsStep;