import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home Page", () => {
  it("renders the home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /explore templates/i })
    ).toBeInTheDocument();
  });
});
