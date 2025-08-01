import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Background from "./index";

describe("Background", () => {
  test("renders vs symbol", () => {
    render(<Background />);

    expect(screen.getByText("VS")).toBeInTheDocument();
  });

  test("renders battlefield elements", () => {
    const { container } = render(<Background />);

    expect(container.querySelector(".battleFieldLeft")).toBeInTheDocument();
    expect(container.querySelector(".battleFieldRight")).toBeInTheDocument();
    expect(container.querySelector(".vsSymbol")).toBeInTheDocument();
  });
});
