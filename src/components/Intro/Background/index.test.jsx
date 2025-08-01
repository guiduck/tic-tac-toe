import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Background from "./index";

describe("Intro Background", () => {
  test("renders background elements", () => {
    const { container } = render(<Background />);

    expect(container.querySelector(".background")).toBeInTheDocument();
    expect(container.querySelector(".oceanWaves")).toBeInTheDocument();
    expect(container.querySelector(".landSilhouette")).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    const { container } = render(<Background />);

    const background = container.querySelector(".background");
    expect(background).toBeInTheDocument();

    const children = background?.children;
    expect(children).toHaveLength(2);
  });
});
