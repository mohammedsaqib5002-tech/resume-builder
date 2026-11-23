import { Box, Button } from "@mui/material";

// Reusable navigation for the multi-step resume form.
function StepNavigation({
  activeStep,
  stepsLength,
  handleBack,
  handleNext,
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mt={4}
      gap={2}
    >
      <Button
        variant="outlined"
        onClick={handleBack}
      >
        Back
      </Button>

      <Button
        variant="contained"
        onClick={handleNext}
      >
        {activeStep === stepsLength - 1
          ? "Preview Resume"
          : "Next"}
      </Button>
    </Box>
  );
}

export default StepNavigation;