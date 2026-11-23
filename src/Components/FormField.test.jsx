
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, it, expect } from "vitest";
import FormField from "./FormField";

function TestWrapper({ name, label, required = true, multiline = false }) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <FormField
      name={name}
      label={label}
      register={register}
      errors={errors}
      required={required}
      multiline={multiline}
    />
  );
}

describe("FormField component", () => {
  it("renders the input with the provided label", () => {
    render(<TestWrapper name="fullName" label="Full Name" />);

    expect(
      screen.getByRole("textbox", { name: /full name/i })
    ).toBeInTheDocument();
  });

  it("renders a multiline field when requested", () => {
    render(
      <TestWrapper
        name="summary"
        label="Professional Summary"
        multiline
      />
    );

    expect(
      screen.getByRole("textbox", { name: /professional summary/i })
    ).toBeInTheDocument();
  });

  it("supports optional fields", () => {
    render(
      <TestWrapper
        name="summary"
        label="Professional Summary"
        required={false}
      />
    );

    expect(
      screen.getByRole("textbox", { name: /professional summary/i })
    ).toBeInTheDocument();
  });
});
