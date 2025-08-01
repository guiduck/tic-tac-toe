import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpandButton from "./expandButton";

describe("ExpandButton", () => {
  test("renders draw message and expand button", () => {
    const mockExpand = jest.fn();
    render(<ExpandButton expandBoardAfterDraw={mockExpand} />);

    expect(screen.getByText("Empate!")).toBeInTheDocument();
    expect(screen.getByText("Expandir Tabuleiro (E)")).toBeInTheDocument();
  });

  test("renders draw icon", () => {
    const mockExpand = jest.fn();
    render(<ExpandButton expandBoardAfterDraw={mockExpand} />);

    expect(screen.getByText("⚖️")).toBeInTheDocument();
  });

  test("renders button with correct accessibility label", () => {
    const mockExpand = jest.fn();
    render(<ExpandButton expandBoardAfterDraw={mockExpand} />);

    const button = screen.getByLabelText(
      "Expandir tabuleiro em caso de empate"
    );
    expect(button).toBeInTheDocument();
  });
});
