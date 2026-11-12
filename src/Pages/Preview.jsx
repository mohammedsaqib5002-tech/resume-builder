
import React, { useRef, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Header from "../Components/Header";

function Preview() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

  // Redux data
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

  // Local state
  const [resumeName, setResumeName] = useState("My Resume");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Template colors
  const colors = {
    1: "#2563eb",
    2: "#db2777",
    3: "#16a34a",
    4: "#d97706",
  };

  const accent = colors[selectedTemplate] || "#2563eb";

  // PDF DOWNLOAD

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

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate the maximum image height for one A4 page.
      const pagePixelHeight =
        (canvas.width * pageHeight) / pageWidth;

      // Find smaller blocks that should preferably stay together.
      const resumeRect = resumeRef.current.getBoundingClientRect();
      const scaleY = canvas.height / resumeRect.height;

      const keepTogetherBlocks = Array.from(
        resumeRef.current.querySelectorAll(
          ".pdf-keep-together, .resume-entry"
        )
      )
        .map((element) => {
          const rect = element.getBoundingClientRect();

          return {
            top: (rect.top - resumeRect.top) * scaleY,
            bottom: (rect.bottom - resumeRect.top) * scaleY,
            height: rect.height * scaleY,
          };
        })
        .filter((block) => block.height < pagePixelHeight);


      let startY = 0;
      let pageNumber = 0;

      while (startY < canvas.height) {
        // Add top spacing to every page after the first.
        const pageTopPadding =
          pageNumber > 0 ? 24 * scaleY : 0;

        const availablePageHeight =
          pagePixelHeight - pageTopPadding;

        let endY = Math.min(
          startY + availablePageHeight,
          canvas.height
        );

        // Avoid splitting smaller sections and entries.
        if (endY < canvas.height) {
          const crossingBlock = keepTogetherBlocks
            .filter(
              (block) =>
                block.top < endY &&
                block.bottom > endY &&
                block.height < availablePageHeight &&
                block.top > startY + 80
            )
            .sort((a, b) => a.top - b.top)[0];

          if (crossingBlock) {
            endY = crossingBlock.top;
          }
        }

        const sliceHeight = Math.ceil(endY - startY);

        if (sliceHeight <= 0) {
          break;
        }

        const pageCanvas = document.createElement("canvas");

        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight + pageTopPadding;

        const context = pageCanvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        context.drawImage(
          canvas,
          0,
          startY,
          canvas.width,
          sliceHeight,
          0,
          pageTopPadding,
          canvas.width,
          sliceHeight
        );

        const pageImage = pageCanvas.toDataURL("image/png");

        const imageHeight =
          (pageCanvas.height * pageWidth) / canvas.width;

        if (pageNumber > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          pageImage,
          "PNG",
          0,
          0,
          pageWidth,
          imageHeight
        );

        startY = endY;
        pageNumber++;
      }

      const safeName = resumeName
        .trim()
        .replace(/[<>:"/\\|?*]/g, "_");

      pdf.save(`${safeName}.pdf`);

      setOpenModal(true);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Unable to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Section heading
  const SectionHeading = ({ children }) => (
    <Box>

      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 800,
          color: accent,
          letterSpacing: 1.5,
          mb: 1,
        }}
      >
        {children}
      </Typography>

      <Divider
        sx={{
          borderColor: accent,
          borderBottomWidth: 2,
        }}
      />
    </Box>
  );

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

        <Box className="pdf-keep-together"
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
              {/* Personal information */}
              <Box className="pdf-keep-together"
                sx={{
                  borderLeft: `7px solid ${accent}`,
                  backgroundColor: `${accent}0D`,
                  p: { xs: 2, md: 3 },
                  mb: 4,
                  borderRadius: "4px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 25, md: 32 },
                    fontWeight: 800,
                    color: accent,
                    letterSpacing: 1,
                    overflowWrap: "anywhere",
                  }}
                >
                  {personalInfo.fullName || "Your Name"}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#334155",
                    mt: 1,
                  }}
                >
                  {personalInfo.jobTitle || "Professional Title"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  {personalInfo.email && (
                    <Typography fontSize={12}>
                      ✉ {personalInfo.email}
                    </Typography>
                  )}

                  {personalInfo.phone && (
                    <Typography fontSize={12}>
                      ☎ {personalInfo.phone}
                    </Typography>
                  )}

                  {personalInfo.address && (
                    <Typography fontSize={12}>
                      📍 {personalInfo.address}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Professional summary */}
              {personalInfo.summary && (
                <Box mb={4} className="pdf-keep-together">
                  <SectionHeading>
                    PROFESSIONAL SUMMARY
                  </SectionHeading>

                  <Typography
                    fontSize={13}
                    lineHeight={1.8}
                    sx={{ whiteSpace: "pre-wrap" }}
                  >
                    {personalInfo.summary}
                  </Typography>
                </Box>
              )}

              {/* Work experience */}
              {(workExperience.position ||
                workExperience.company ||
                workExperience.description) && (
                  <Box mb={4} className="resume-section pdf-keep-together">
                    <SectionHeading>
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
                      <Typography fontWeight="bold" fontSize={15}>
                        {workExperience.position}
                      </Typography>

                      <Typography
                        fontSize={13}
                        fontWeight={600}
                        color="#475569"
                        mt={0.5}
                      >
                        {workExperience.company}
                      </Typography>

                      <Typography
                        fontSize={12}
                        color="#64748b"
                        mt={0.5}
                      >
                        {workExperience.startDate}
                        {workExperience.startDate &&
                          workExperience.endDate
                          ? " — "
                          : ""}
                        {workExperience.endDate}
                      </Typography>

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
                )}

              {/* Education */}
              {(education.degree ||
                education.institution ||
                education.startYear ||
                education.endYear) && (
                  <Box mb={4} className="resume-section pdf-keep-together">
                    <SectionHeading>EDUCATION</SectionHeading>

                    <Box
                      className="resume-entry"
                      sx={{
                        borderLeft: `3px solid ${accent}`,
                        pl: 2,
                        py: 0.5,
                      }}
                    >
                      <Typography fontWeight="bold" fontSize={15}>
                        {education.degree}
                      </Typography>

                      <Typography
                        fontSize={13}
                        color="#475569"
                        mt={0.5}
                      >
                        {education.institution}
                      </Typography>

                      <Typography
                        fontSize={12}
                        color="#64748b"
                        mt={0.5}
                      >
                        {education.startYear}
                        {education.startYear && education.endYear
                          ? " — "
                          : ""}
                        {education.endYear}
                      </Typography>
                    </Box>
                  </Box>
                )}

              {/* Key skills */}
              {skills.length > 0 && (
                <Box
                  sx={{ mt: 4, mb: 4 }}
                  className="resume-section pdf-keep-together"
                >
                  <SectionHeading>KEY SKILLS</SectionHeading>

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
              )}


              {/* Projects */}
              {projects.length > 0 && (
                <Box mb={4}>
                  <SectionHeading>PROJECTS</SectionHeading>

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
                      <Typography fontWeight="bold" fontSize={15}>
                        {project.name}
                      </Typography>

                      {project.technologies && (
                        <Typography fontSize={12} color="#475569" mt={0.5}>
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
                          sx={{ color: accent, overflowWrap: "anywhere" }}
                        >
                          {project.link}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <Box mb={4}>
                  <SectionHeading>CERTIFICATIONS</SectionHeading>

                  {certifications.map((certificate, index) => (
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
                      <Typography fontWeight="bold" fontSize={15}>
                        {certificate.name}
                      </Typography>

                      {certificate.organization && (
                        <Typography fontSize={13} color="#475569" mt={0.5}>
                          {certificate.organization}
                        </Typography>
                      )}

                      {certificate.date && (
                        <Typography fontSize={12} color="#64748b" mt={0.5}>
                          {certificate.date}
                        </Typography>
                      )}

                      {certificate.link && (
                        <Typography
                          component="a"
                          href={certificate.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          fontSize={12}
                          sx={{ color: accent, overflowWrap: "anywhere" }}
                        >
                          View Certificate
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}


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
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <DownloadIcon />
                )
              }
              onClick={downloadPDF}
              disabled={loading}
              sx={{
                py: 1.4,
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

      {/* Success dialog */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          <CheckCircleIcon
            sx={{
              fontSize: 65,
              color: "#16a34a",
            }}
          />

          <Typography variant="h5" fontWeight="bold">
            Resume Downloaded!
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography
            textAlign="center"
            color="text.secondary"
          >
            Your resume has been successfully generated
            and downloaded.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(false);
              navigate("/");
            }}
          >
            Back to Home
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Preview;
