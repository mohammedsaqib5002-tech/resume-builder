
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DETAILS_STEPS, STEP_FIELDS } from "../Data/DetailsConfig";
import FormField from "../Components/FormField";
import ProjectsStep from "../Components/ProjectsStep";
import CertificationsStep from "../Components/CertificationsStep";
import PersonalInfoStep from "../Components/PersonalInfoStep";
import WorkExperienceStep from "../Components/WorkExperienceStep";
import EducationStep from "../Components/EducationStep";
import SkillsStep from "../Components/SkillsStep";
import StepNavigation from "../Components/StepNavigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import {
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateProjects,
  updateCertifications,
  setTemplate,
} from "../Redux/ResumeSlice";

import Header from "../Components/Header";

const steps = DETAILS_STEPS;

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(resume.personalInfo || {}),
      ...(resume.workExperience || {}),
      ...(resume.education || {}),
      skills: (resume.skills || []).join(", "),
      projects: (resume.projects || []).map((project) => ({
        ...project,
      })),
      certifications: (resume.certifications || []).map(
        (certification) => ({
          ...certification,
        })
      ),
    },
  });

  // Dynamic project fields
  const {
    fields: projectFields,
    append: addProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  // Dynamic certification fields
  const {
    fields: certificationFields,
    append: addCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    if (templateId) {
      dispatch(setTemplate(templateId));
    }
  }, [templateId, dispatch]);

  // Fields to validate for each step
  const fields = STEP_FIELDS;

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
      dispatch(updateProjects(cleanEntries(values.projects || [])));
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

    // Validate Personal Info, Work Experience, Education and Skills
    if (activeStep >= 0 && activeStep <= 3) {
      valid = await trigger(fields[activeStep]);
    }

    // Validate Projects (project name + project link)
    if (activeStep === 4) {
      const projects = getValues("projects") || [];

      const projectValidationFields = projects.flatMap(
        (_, index) => [
          `projects.${index}.name`,
          `projects.${index}.link`,
        ]
      );

      if (projectValidationFields.length > 0) {
        valid = await trigger(projectValidationFields);
      }
    }

    // Validate Certifications
    if (activeStep === 5) {
      const certifications = getValues("certifications") || [];

      if (certifications.length === 0) {
        valid = false;

        setError("certifications", {
          type: "required",
          message: "Please add at least one certification.",
        });
      } else {
        clearErrors("certifications");

        const certificationValidationFields =
          certifications.flatMap((_, index) => [
            `certifications.${index}.name`,
            `certifications.${index}.link`,
          ]);

        valid = await trigger(certificationValidationFields);
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

  // Reusable form field component
  const renderField = (name, label, required = true, multiline = false) => (
    <FormField
      name={name}
      label={label}
      register={register}
      errors={errors}
      required={required}
      multiline={multiline}
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
            textAlign: "center",
            color: "text.secondary",
            mb: 5,
          }}
        >
          Fill in your information to build your professional resume.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 3,
          }}
        >
          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
          >
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <PersonalInfoStep
                renderField={renderField}
                fields={fields}
              />
            )}

            {activeStep === 1 && (
              <WorkExperienceStep
                renderField={renderField}
                register={register}
                errors={errors}
                getValues={getValues}
              />
            )}

            {activeStep === 2 && (
              <EducationStep
                renderField={renderField}
                register={register}
                errors={errors}
                getValues={getValues}
              />
            )}

            {activeStep === 3 && (
              <SkillsStep
                register={register}
                skillsValue={skillsValue}
              />
            )}
          
            {activeStep === 4 && (
              <ProjectsStep
                projectFields={projectFields}
                register={register}
                errors={errors}
                getValues={getValues}
                addProject={addProject}
                removeProject={removeProject}
              />
            )}


            {activeStep === 5 && (
              <CertificationsStep
                certificationFields={certificationFields}
                register={register}
                errors={errors}
                getValues={getValues}
                addCertification={addCertification}
                removeCertification={removeCertification}
                clearErrors={clearErrors}
              />
            )}

            {/* DIVIDER */}
            <Divider sx={{ my: 3 }} />

            {/* NAVIGATION BUTTONS - OUTSIDE ALL STEP CONDITIONS */}
            <StepNavigation
              activeStep={activeStep}
              stepsLength={steps.length}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          </Box>
        </Paper>
      </Container >
    </>
  );
}

export default Details;
