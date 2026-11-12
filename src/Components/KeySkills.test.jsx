
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import KeySkills from "./KeySkills";
import resumeReducer from "../Redux/ResumeSlice";

describe("KeySkills Component", () => {
  const createTestStore = (skills = []) =>
    configureStore({
      reducer: { resume: resumeReducer },
      preloadedState: {
        resume: {
          selectedTemplate: 1,
          personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            jobTitle: "",
            summary: "",
          },
          workExperience: {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          },
          education: {
            institution: "",
            degree: "",
            startYear: "",
            endYear: "",
          },
          skills,
        },
      },
    });

  it("renders Key Skills heading", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <KeySkills />
      </Provider>
    );

    expect(screen.getByText("Key Skills")).toBeInTheDocument();
  });

  it("adds a new skill to Redux", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <KeySkills />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter a skill"), {
      target: { value: "React" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Skill" }));

    expect(store.getState().resume.skills).toContain("React");
  });

  it("removes a skill from Redux", () => {
    const store = createTestStore(["React", "JavaScript"]);

    render(
      <Provider store={store}>
        <KeySkills />
      </Provider>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);

    expect(store.getState().resume.skills).toEqual(["JavaScript"]);
  });
});
