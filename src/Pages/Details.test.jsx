
import { describe, it, expect } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Details from "./Details";
import resumeReducer from "../Redux/ResumeSlice";

describe("Details Page", () => {

  // Test 1: Render the form
  it("renders the personal information form", () => {
    const store = configureStore({
      reducer: {
        resume: resumeReducer,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/details/1"]}>
          <Routes>
            <Route path="/details/:templateId" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Create Your Resume")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  // Test 2: Validate required fields
  it("shows validation errors for empty required fields", async () => {
    const store = configureStore({
      reducer: {
        resume: resumeReducer,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/details/1"]}>
          <Routes>
            <Route path="/details/:templateId" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Full Name is required")).toBeInTheDocument();
      expect(screen.getByText("Job Title is required")).toBeInTheDocument();
    });
  });

});


it("moves to Work Experience after valid personal information", async () => {
  const store = configureStore({
    reducer: {
      resume: resumeReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:templateId" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText("Full Name"), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByLabelText("Job Title"), {
    target: { value: "Frontend Developer" },
  });

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "john@example.com" },
  });

  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: "9876543210" },
  });

  fireEvent.change(screen.getByLabelText("Address"), {
    target: { value: "New York" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Next" }));

  expect(
    await screen.findByText("Work Experience")
  ).toBeInTheDocument();
});


it("returns to Personal Information when Back is clicked", async () => {
  const store = configureStore({
    reducer: {
      resume: resumeReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:templateId" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText("Full Name"), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByLabelText("Job Title"), {
    target: { value: "Frontend Developer" },
  });

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "john@example.com" },
  });

  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: "9876543210" },
  });

  fireEvent.change(screen.getByLabelText("Address"), {
    target: { value: "New York" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Next" }));

  expect(await screen.findByText("Work Experience")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Back" }));

  expect(
    await screen.findByText("Personal Information")
  ).toBeInTheDocument();
});
