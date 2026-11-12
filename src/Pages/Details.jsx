
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Divider
} from "@mui/material";

import {
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateProjects,
  updateCertifications,
  setTemplate
} from "../Redux/ResumeSlice";

import Header from "../Components/Header";

const steps = [
  "Personal Info",
  "Work Experience",
  "Education",
  "Key Skills",
  "Projects",
  "Certifications"
];

function Details() {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templateId } = useParams();

  const resume = useSelector((state) => state.resume || {});


  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...(resume.personalInfo || {}),
      ...(resume.workExperience || {}),
      ...(resume.education || {}),
      skills: (resume.skills || []).join(", "),

      projects: (resume.projects || []).map((project) => ({
        ...project
      })),

      certifications: (resume.certifications || []).map(
        (certification) => ({
          ...certification
        })
      )
    }
  });

  // Dynamic project fields
  const {
    fields: projectFields,
    append: addProject,
    remove: removeProject
  } = useFieldArray({
    control,
    name: "projects"
  });

  // Dynamic certification fields
  const {
    fields: certificationFields,
    append: addCertification,
    remove: removeCertification
  } = useFieldArray({
    control,
    name: "certifications"
  });

  useEffect(() => {
    if (templateId) {
      dispatch(setTemplate(templateId));
    }
  }, [templateId, dispatch]);

  // Fields to validate for each step
  const fields = [
    ["fullName", "email", "phone", "address", "jobTitle"],
    ["company", "position", "startDate", "endDate"],
    ["institution", "degree", "startYear", "endYear"],
    ["skills"],
    [],
    []
  ];

  // Remove completely empty entries before saving
  const cleanEntries = (entries) =>
    entries.filter((entry) =>
      Object.values(entry).some(
        (value) => String(value || "").trim() !== ""
      )
    );

  // Save current step to Redux
  const saveCurrentStep = () => {
    const values = structuredClone(getValues());

    if (activeStep === 0) {
      dispatch(updatePersonalInfo(values));
    }

    if (activeStep === 1) {
      dispatch(updateWorkExperience(values));
    }

    if (activeStep === 2) {
      dispatch(updateEducation(values));
    }

    if (activeStep === 3) {
      const skillList = (values.skills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      dispatch(updateSkills(skillList));
    }

    if (activeStep === 4) {
      dispatch(
        updateProjects(cleanEntries(values.projects || []))
      );
    }

    if (activeStep === 5) {
      dispatch(
        updateCertifications(
          cleanEntries(values.certifications || [])
        )
      );
    }
  };

  // Next button functionality and validation
  const handleNext = async () => {
    let valid = true;

    // Validate Personal Info, Work Experience,
    // Education and Skills
    if (activeStep >= 0 && activeStep <= 3) {
      valid = await trigger(fields[activeStep]);
    }

    // Validate Projects
    if (activeStep === 4) {
      const projects = getValues("projects") || [];

      const projectNameFields = projects.map(
        (_, index) => `projects.${index}.name`
      );

      if (projectNameFields.length > 0) {
        valid = await trigger(projectNameFields);
      }
    }

    // Validate Certifications
    if (activeStep === 5) {
      const certifications = getValues("certifications") || [];

      if (certifications.length === 0) {
        valid = false;

        setError("certifications", {
          type: "required",
          message: "Please add at least one certification."
        });
      } else {
        clearErrors("certifications");

        const certificationNameFields = certifications.map(
          (_, index) => `certifications.${index}.name`
        );

        valid = await trigger(certificationNameFields);
      }
    }

    // Stop if validation fails
    if (!valid) {
      return;
    }

    // Save current step
    saveCurrentStep();

    // Open Preview after final step
    if (activeStep === steps.length - 1) {
      navigate("/preview");
      return;
    }

    // Move to next step
    setActiveStep((prev) => prev + 1);
  };

  // Back button functionality
  const handleBack = () => {
    if (activeStep > 0) {
      saveCurrentStep();
      setActiveStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  // Reusable form field
  const renderField = (
    name,
    label,
    required = true,
    multiline = false
  ) => (
    <TextField
      fullWidth
      label={label}
      multiline={multiline}
      minRows={multiline ? 3 : 1}
      {...register(name, {
        required: required ? `${label} is required` : false
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      sx={{ mb: 3 }}
    />
  );

  const skillsValue = watch("skills", "");

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="#172554"
          mb={1}
        >
          Create Your Resume
        </Typography>

        <Typography
          sx={{
            textalign: "center",
            color: "text.secondary",
            mb: 5
          }}
        >
          Fill in your information to build your professional resume.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 3
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ mb: 5 }}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
          >

            {/* STEP 1: PERSONAL INFORMATION */}
            {activeStep === 0 && (
              <>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("fullName", "Full Name")}
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("jobTitle", "Job Title")}
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Enter a valid email"
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("phone", "Phone Number")}
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    {renderField("address", "Address")}
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    {renderField(
                      "summary",
                      "Professional Summary",
                      false,
                      true
                    )}
                  </Grid>
                </Grid>
              </>
            )}

            {/* STEP 2: WORK EXPERIENCE */}
            {activeStep === 1 && (
              <>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Work Experience
                </Typography>

                {renderField("company", "Company Name")}
                {renderField("position", "Job Position")}

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("startDate", "Start Date")}
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("endDate", "End Date")}
                  </Grid>
                </Grid>

                {renderField(
                  "description",
                  "Work Description",
                  false,
                  true
                )}
              </>
            )}

            {/* STEP 3: EDUCATION */}
            {activeStep === 2 && (
              <>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Education Details
                </Typography>

                {renderField("institution", "Institution Name")}
                {renderField("degree", "Degree / Qualification")}

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("startYear", "Start Year")}
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    {renderField("endYear", "End Year")}
                  </Grid>
                </Grid>
              </>
            )}

            {/* STEP 4: KEY SKILLS */}
            {activeStep === 3 && (
              <>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Key Skills
                </Typography>

                <Typography color="text.secondary" mb={3}>
                  Enter your skills separated by commas.
                </Typography>

                {renderField(
                  "skills",
                  "Example: React, JavaScript, HTML, CSS"
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                  }}
                >
                  {skillsValue
                    ?.split(",")
                    .filter((skill) => skill.trim())
                    .map((skill, index) => (
                      <Chip key={index} label={skill.trim()} />
                    ))}
                </Box>
              </>
            )}

            {/* STEP 5: PROJECTS */}
            {activeStep === 4 && (
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
                        required: "Project name is required"
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
                      {...register(`projects.${index}.link`)}
                    />
                  </Paper>
                ))}

                <Button
                  type="button"
                  variant="outlined"
                  onClick={() =>
                    addProject({
                      name: "",
                      technologies: "",
                      description: "",
                      link: ""
                    })
                  }
                >
                  + Add Project
                </Button>
              </>
            )}

            {/* STEP 6: CERTIFICATIONS */}
            {activeStep === 5 && (
              <>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  Certifications
                </Typography>

                <Typography color="text.secondary" mb={3}>
                  Add your professional courses and certificates.
                </Typography>

                {certificationFields.map((field, index) => (
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
                        Certification {index + 1}
                      </Typography>

                      <Button
                        type="button"
                        color="error"
                        onClick={() => removeCertification(index)}
                      >
                        Remove
                      </Button>
                    </Box>

                    <TextField
                      fullWidth
                      label="Certificate Name"
                      {...register(`certifications.${index}.name`, {
                        required: "Certificate name is required"
                      })}
                      error={!!errors.certifications?.[index]?.name}
                      helperText={
                        errors.certifications?.[index]?.name?.message
                      }
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Issuing Organization"
                      {...register(
                        `certifications.${index}.organization`
                      )}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Issue Date"
                      placeholder="November 2026"
                      {...register(`certifications.${index}.date`)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Certificate Link"
                      placeholder="https://example.com"
                      {...register(`certifications.${index}.link`)}
                    />
                  </Paper>
                ))}

                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    clearErrors("certifications");

                    addCertification({
                      name: "",
                      organization: "",
                      date: "",
                      link: ""
                    });
                  }}
                >
                  + Add Certification
                </Button>

                {errors.certifications?.message && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {errors.certifications.message}
                  </Typography>
                )}
              </>
            )}

            {/* DIVIDER */}
            <Divider sx={{ my: 3 }} />

            {/* NAVIGATION BUTTONS - OUTSIDE ALL STEP CONDITIONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>

              <Button
                type="button"
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: "#2563eb",
                  px: 4
                }}
              >
                {activeStep === 5
                  ? "Preview Resume"
                  : "Next"}
              </Button>
            </Box>

          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Details;
