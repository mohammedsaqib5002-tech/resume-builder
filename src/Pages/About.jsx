
import React from "react";
import { Box, Container, Typography, Paper, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box textAlign="center" mb={5}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            About Resume Builder
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create a professional resume in just a few simple steps.
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Who We Are
          </Typography>
          <Typography color="text.secondary" paragraph>
            Resume Builder is a simple and user-friendly application that
            helps you create professional resumes without needing design
            experience.
          </Typography>

          <Typography variant="h5" fontWeight="bold" gutterBottom mt={3}>
            What We Offer
          </Typography>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography fontWeight="bold">Multiple Templates</Typography>
              <Typography color="text.secondary">
                Choose from four resume designs to match your style.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography fontWeight="bold">Easy Form Filling</Typography>
              <Typography color="text.secondary">
                Add your personal details, experience, education, and skills.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography fontWeight="bold">Live Preview</Typography>
              <Typography color="text.secondary">
                Review your resume before downloading it.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography fontWeight="bold">PDF Download</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Download your completed resume as a PDF.
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
            >
              Create Your Resume
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default About;
