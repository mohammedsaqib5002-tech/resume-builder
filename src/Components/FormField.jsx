
import { TextField } from "@mui/material";

// Reusable form field connected to React Hook Form
function FormField({
  name,
  label,
  register,
  errors,
  required = true,
  multiline = false,
}) {
  return (
    <TextField
      fullWidth
      label={label}
      multiline={multiline}
      minRows={multiline ? 3 : 1}
      {...register(name, {
        required: required ? `${label} is required` : false,
        validate:
          name === "skills"
            ? (value) =>
                value
                  .split(",")
                  .some((skill) => skill.trim() !== "") ||
                "Enter at least one valid skill"
            : undefined,
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      sx={{ mb: 3 }}
    />
  );
}

export default FormField;
