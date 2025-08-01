import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Controls from "./index";

describe("Controls", () => {
  const mockProps = {
    onBackToIntro: jest.fn(),
    onSwitchPlayer: jest.fn(),
    onStartGame: jest.fn(),
    bothPlayersReady: false,
  };

  test("renders all control buttons", () => {
    render(<Controls {...mockProps} />);

    expect(screen.getByText("← Voltar")).toBeInTheDocument();
    expect(screen.getByText("Trocar Jogador (Tab)")).toBeInTheDocument();
    expect(screen.getByText("Começar Batalha!")).toBeInTheDocument();
  });

  test("disables start button when players not ready", () => {
    render(<Controls {...mockProps} bothPlayersReady={false} />);

    const startButton = screen.getByText("Começar Batalha!");
    expect(startButton).toBeDisabled();
  });

  test("enables start button when both players ready", () => {
    render(<Controls {...mockProps} bothPlayersReady={true} />);

    const startButton = screen.getByText("Começar Batalha!");
    expect(startButton).not.toBeDisabled();
  });

  test("disables switch player button when both players ready", () => {
    render(<Controls {...mockProps} bothPlayersReady={true} />);

    const switchButton = screen.getByText("Trocar Jogador (Tab)");
    expect(switchButton).toBeDisabled();
  });
});
