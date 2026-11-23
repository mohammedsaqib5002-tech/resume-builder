import { Typography, Grid, TextField } from "@mui/material";

// Reusable Education form step.
function EducationStep({ renderField, register, errors, getValues }) {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Education Details
      </Typography>

      {renderField("institution", "Institution Name")}
      {renderField("degree", "Degree / Qualification")}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Start Year"
            placeholder="e.g. 2022"
            {...register("startYear", {
              required: "Start year is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Enter a valid 4-digit year",
              },
              validate: (value) =>
                Number(value) <= new Date().getFullYear() ||
                "Start year cannot be in the future",
            })}
            error={!!errors.startYear}
            helperText={errors.startYear?.message}
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="End Year"
            placeholder="e.g. 2026"
            {...register("endYear", {
              required: "End year is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Enter a valid 4-digit year",
              },
              validate: (value) => {
                if (Number(value) > new Date().getFullYear()) {
                  return "End year cannot be in the future";
                }

                return (
                  Number(value) >= Number(getValues("startYear")) ||
                  "End year must be after Start year"
                );
              },
            })}
            error={!!errors.endYear}
            helperText={errors.endYear?.message}
            sx={{ mb: 3 }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default EducationStep;