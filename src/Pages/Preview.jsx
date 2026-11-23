
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import Header from "../Components/Header";
import DownloadSuccessDialog from "../Components/DownloadSuccessDialog";
import ResumeHeader from "../Components/ResumeHeader";
import ProfessionalSummary from "../Components/ProfessionalSummary";
import WorkExperiencePreview from "../Components/WorkExperiencePreview";
import EducationPreview from "../Components/EducationPreview";
import KeySkillsPreview from "../Components/KeySkillsPreview";
import ProjectsPreview from "../Components/ProjectsPreview";
import CertificationsPreview from "../Components/CertificationsPreview";

import generateResumePDF from "../utilis/generateResumePDF.js";

function Preview() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

  // Retrieve resume data from Redux.
  const resume = useSelector((state) => state.resume || {});

  const {
    selectedTemplate = 1,
    personalInfo = {},
    workExperience = {},
    education = {},
    skills = [],
    projects = [],
    certifications = [],
  } = resume;

  // Local state.
  const [resumeName, setResumeName] = useState("My Resume");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Template accent colors.
  const colors = {
    1: "#2563eb",
    2: "#db2777",
    3: "#16a34a",
    4: "#d97706",
  };

  const accent = colors[selectedTemplate] || "#2563eb";

  // Generate and download the resume PDF.
  const downloadPDF = async () => {
    if (!resumeName.trim()) {
      alert("Please enter a resume name.");
      return;
    }

    if (!resumeRef.current) {
      alert("Resume preview is not available.");
      return;
    }

    try {
      setLoading(true);

      await generateResumePDF(resumeRef.current, resumeName);

      setOpenModal(true);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Unable to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Page heading */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#172554"
          >
            Resume Preview
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Your professional resume is ready!
          </Typography>
        </Box>

        {/* Main preview and download layout */}
        <Box
          className="pdf-keep-together"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 2fr) minmax(250px, 1fr)",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* Resume preview */}
          <Paper
            elevation={4}
            sx={{
              p: { xs: 1, md: 3 },
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              ref={resumeRef}
              sx={{
                backgroundColor: "#ffffff",
                color: "#1e293b",
                minHeight: 850,
                width: "100%",
                boxSizing: "border-box",
                p: { xs: 2, md: 4 },
                fontFamily: "Arial, sans-serif",
              }}
            >
              <ResumeHeader
                personalInfo={personalInfo}
                accent={accent}
              />

              <ProfessionalSummary
                summary={personalInfo.summary}
                accent={accent}
              />

              <WorkExperiencePreview
                workExperience={workExperience}
                accent={accent}
              />

              {/* Education */}
              <EducationPreview
                education={education}
                accent={accent}
              />

              {/* Key Skills */}
              <KeySkillsPreview
                skills={skills}
                accent={accent}
              />

              {/* Projects */}
              <ProjectsPreview
                projects={projects}
                accent={accent}
              />

              {/* Certifications */}
              <CertificationsPreview
                certifications={certifications}
                accent={accent}
              />

              {/* Footer */}
              <Divider sx={{ mt: 4, mb: 2 }} />

              <Typography
                fontSize={10}
                color="#94a3b8"
                textAlign="center"
              >
                Generated with Resume Builder
              </Typography>
            </Box>
          </Paper>

          {/* Download section */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              position: { md: "sticky" },
              top: 20,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Save Your Resume
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
            >
              Give your resume a name before downloading it.
            </Typography>

            {/* Resume file name */}
            <TextField
              fullWidth
              label="Resume Name"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Back to edit */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                navigate(`/details/${selectedTemplate}`)
              }
              sx={{
                mb: 2,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Back to Edit
            </Button>

            {/* Download PDF */}
            <Button
              fullWidth
              variant="contained"
              onClick={downloadPDF}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <DownloadIcon />
                )
              }
              sx={{
                py: 1.2,
                borderRadius: 2,
                backgroundColor: accent,
                "&:hover": {
                  backgroundColor: accent,
                  filter: "brightness(0.9)",
                },
              }}
            >
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          </Paper>
        </Box>
      </Container>

      {/* Download success dialog */}
      <DownloadSuccessDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onBackHome={() => {
          setOpenModal(false);
          navigate("/");
        }}
      />
    </>
  );
}

export default Preview;
