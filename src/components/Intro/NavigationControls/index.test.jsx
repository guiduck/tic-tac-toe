import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationControls from "./index";

describe("NavigationControls", () => {
  const mockProps = {
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onSkip: jest.fn(),
    isPreviousDisabled: false,
    isNextDisabled: false,
    nextButtonText: "Próximo",
  };

  test("renders all navigation buttons", () => {
    render(<NavigationControls {...mockProps} />);

    expect(screen.getByText("← Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
    expect(screen.getByText("Pular Introdução")).toBeInTheDocument();
  });

  test("disables previous button when specified", () => {
    render(<NavigationControls {...mockProps} isPreviousDisabled={true} />);

    const previousButton = screen.getByText("← Anterior");
    expect(previousButton).toBeDisabled();
  });

  test("disables next button when specified", () => {
    render(<NavigationControls {...mockProps} isNextDisabled={true} />);

    const nextButton = screen.getByText("Próximo");
    expect(nextButton).toBeDisabled();
  });

  test("renders custom next button text", () => {
    render(<NavigationControls {...mockProps} nextButtonText="Finalizar" />);

    expect(screen.getByText("Finalizar")).toBeInTheDocument();
    expect(screen.queryByText("Próximo")).not.toBeInTheDocument();
  });

  test("renders keyboard hints", () => {
    render(<NavigationControls {...mockProps} />);

    expect(screen.getByText(/Enter/)).toBeInTheDocument();
    expect(screen.getByText(/Espaço/)).toBeInTheDocument();
    expect(screen.getByText(/Esc/)).toBeInTheDocument();
  });
});
