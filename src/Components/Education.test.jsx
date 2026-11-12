
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Education from "./Education";
import resumeReducer from "../Redux/ResumeSlice";

describe("Education Component", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        resume: resumeReducer,
      },
    });

  it("renders education form fields", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Education />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Degree / Qualification")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("School / College")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Start Year")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("End Year")).toBeInTheDocument();
  });

  it("updates Redux when education details change", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Education />
      </Provider>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Degree / Qualification"),
      { target: { value: "B.Tech" } }
    );

    expect(store.getState().resume.education.degree).toBe("B.Tech");
  });

  it("renders Save Education button", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Education />
      </Provider>
    );

    expect(
      screen.getByRole("button", { name: "Save Education" })
    ).toBeInTheDocument();
  });
});
