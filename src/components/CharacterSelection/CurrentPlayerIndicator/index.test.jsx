import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentPlayerIndicator from "./index";

describe("CurrentPlayerIndicator", () => {
  test("renders current player name", () => {
    render(<CurrentPlayerIndicator currentPlayerName="Jogador 1" />);

    expect(
      screen.getByText("Jogador 1 - Escolha seu personagem")
    ).toBeInTheDocument();
  });

  test("renders with different player name", () => {
    render(<CurrentPlayerIndicator currentPlayerName="Jogador 2" />);

    expect(
      screen.getByText("Jogador 2 - Escolha seu personagem")
    ).toBeInTheDocument();
  });

  test("renders as heading element", () => {
    render(<CurrentPlayerIndicator currentPlayerName="Test Player" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Player - Escolha seu personagem");
  });
});
