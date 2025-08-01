import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameTitle from "./index";

describe("GameTitle", () => {
  test("renders game title", () => {
    render(<GameTitle />);

    expect(screen.getByText("Polvos vs Ratos")).toBeInTheDocument();
    expect(
      screen.getByText("A Batalha pela Dominação Mundial")
    ).toBeInTheDocument();
  });

  test("renders with correct heading structure", () => {
    render(<GameTitle />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Polvos vs Ratos");
  });
});
