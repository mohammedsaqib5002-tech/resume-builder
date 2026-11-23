import { Typography, Grid } from "@mui/material";

// Reusable Personal Information step.
function PersonalInfoStep({ renderField }) {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Personal Information
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Enter your contact details and professional summary.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          {renderField("fullName", "Full Name")}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderField("jobTitle", "Job Title")}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderField("email", "Email")}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderField("phone", "Phone Number")}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {renderField("address", "Address")}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {renderField("summary", "Professional Summary", false, true)}
        </Grid>
      </Grid>
    </>
  );
}

export default PersonalInfoStep;