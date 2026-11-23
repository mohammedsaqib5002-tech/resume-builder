
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";

// Reusable Projects form step.
function ProjectsStep({
  projectFields,
  register,
  errors,
  getValues,
  addProject,
  removeProject,
}) {
  const handleAddProject = () => {
    const currentProjects = getValues("projects") || [];

    const hasEmptyProject = currentProjects.some(
      (project) => !project.name?.trim()
    );

    if (hasEmptyProject) {
      return;
    }

    addProject({
      name: "",
      technologies: "",
      description: "",
      link: "",
    });
  };

  const urlPattern =
    /^https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/i;

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Projects
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Add your personal, academic or professional projects.
      </Typography>

      {projectFields.map((field, index) => (
        <Paper
          key={field.id}
          variant="outlined"
          sx={{ p: 3, mb: 3, borderRadius: 2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography fontWeight="bold">
              Project {index + 1}
            </Typography>

            <Button
              type="button"
              color="error"
              onClick={() => removeProject(index)}
            >
              Remove
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Project Name"
            {...register(`projects.${index}.name`, {
              required: "Project name is required",
            })}
            error={!!errors.projects?.[index]?.name}
            helperText={errors.projects?.[index]?.name?.message}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Technologies Used"
            placeholder="React, JavaScript, MongoDB"
            {...register(`projects.${index}.technologies`)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Project Description"
            {...register(`projects.${index}.description`)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Project Link"
            placeholder="https://example.com"
            {...register(`projects.${index}.link`, {
              required: "Project link is required",
              validate: (value) => {
                if (!value || !value.trim()) {
                  return "Project link is required";
                }

                return (
                  urlPattern.test(value.trim()) ||
                  "Please enter a valid project URL (https://...)"
                );
              },
            })}
            error={!!errors.projects?.[index]?.link}
            helperText={errors.projects?.[index]?.link?.message}
          />
        </Paper>
      ))}

      <Button
        type="button"
        variant="outlined"
        onClick={handleAddProject}
      >
        + Add Project
      </Button>
    </>
  );
}

export default ProjectsStep;
