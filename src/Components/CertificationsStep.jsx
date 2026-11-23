import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";

// Reusable Certifications form step.
function CertificationsStep({
  certificationFields,
  register,
  errors,
  getValues,
  addCertification,
  removeCertification,
  clearErrors,
}) {
  const handleAddCertification = () => {
    const currentCertifications = getValues("certifications") || [];

    const hasEmptyCertification = currentCertifications.some(
      (certification) => !certification.name?.trim()
    );

    if (hasEmptyCertification) {
      return;
    }

    clearErrors("certifications");

    addCertification({
      name: "",
      organization: "",
      issueDate: "",
      link: "",
    });
  };

  const urlPattern =
    /^https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/i;

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Certifications
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Add certifications, courses, and professional credentials.
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
            label="Certification Name"
            {...register(`certifications.${index}.name`, {
              required: "Certification name is required",
            })}
            error={!!errors.certifications?.[index]?.name}
            helperText={errors.certifications?.[index]?.name?.message}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Issuing Organization"
            {...register(`certifications.${index}.organization`)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Issue Date"
            placeholder="MM/YYYY"
            {...register(`certifications.${index}.issueDate`)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Certification Link"
            placeholder="https://example.com/certificate"
            {...register(`certifications.${index}.link`, {
              required: "Certification link is required",
              validate: (value) => {
                if (!value || !value.trim()) {
                  return "Certification link is required";
                }

                return (
                  urlPattern.test(value.trim()) ||
                  "Please enter a valid certification URL (https://...)"
                );
              },
            })}
            error={!!errors.certifications?.[index]?.link}
            helperText={errors.certifications?.[index]?.link?.message}
          />
        </Paper>
      ))}

      {errors.certifications?.message && (
        <Typography color="error" sx={{ mt: 2, mb: 2 }}>
          {errors.certifications.message}
        </Typography>
      )}

      <Button
        type="button"
        variant="outlined"
        onClick={handleAddCertification}
      >
        + Add Certification
      </Button>
    </>
  );
}

export default CertificationsStep;