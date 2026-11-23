import { Typography, Grid, TextField } from "@mui/material";

// Reusable Work Experience form step.
function WorkExperienceStep({
  renderField,
  register,
  errors,
  getValues,
}) {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Work Experience
      </Typography>

      {renderField("company", "Company Name")}
      {renderField("position", "Job Position")}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("startDate", {
              required: "Start date is required",
            })}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("endDate", {
              required: "End date is required",
              validate: (value) =>
                value >= getValues("startDate") ||
                "End date cannot be before Start date",
            })}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            sx={{ mb: 3 }}
          />
        </Grid>
      </Grid>

      {renderField("description", "Work Description", false, true)}
    </>
  );
}

export default WorkExperienceStep;