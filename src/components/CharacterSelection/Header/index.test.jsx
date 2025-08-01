import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./index";

describe("Header", () => {
  test("renders header text", () => {
    render(<Header />);

    expect(screen.getByText("Escolha Seu Lado")).toBeInTheDocument();
    expect(
      screen.getByText("Na batalha épica pela dominação mundial")
    ).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Escolha Seu Lado");
  });
});
