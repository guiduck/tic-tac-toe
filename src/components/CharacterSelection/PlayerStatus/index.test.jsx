import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayerStatus from "./index";

describe("PlayerStatus", () => {
  const mockPlayer1WithCharacter = {
    hasCharacter: jest.fn(() => true),
    getCharacterName: jest.fn(() => "Ratos"),
  };

  const mockPlayer1WithoutCharacter = {
    hasCharacter: jest.fn(() => false),
    getCharacterName: jest.fn(() => null),
  };

  const mockPlayer2WithCharacter = {
    hasCharacter: jest.fn(() => true),
    getCharacterName: jest.fn(() => "Polvos"),
  };

  const mockPlayer2WithoutCharacter = {
    hasCharacter: jest.fn(() => false),
    getCharacterName: jest.fn(() => null),
  };

  test("renders both player status cards", () => {
    render(
      <PlayerStatus
        player1={mockPlayer1WithoutCharacter}
        player2={mockPlayer2WithoutCharacter}
      />
    );

    expect(screen.getByText("Jogador 1")).toBeInTheDocument();
    expect(screen.getByText("Jogador 2")).toBeInTheDocument();
  });

  test("shows waiting status when players have no character", () => {
    render(
      <PlayerStatus
        player1={mockPlayer1WithoutCharacter}
        player2={mockPlayer2WithoutCharacter}
      />
    );

    expect(screen.getAllByText("Aguardando seleção...")).toHaveLength(2);
  });

  test("shows selected character when players have characters", () => {
    render(
      <PlayerStatus
        player1={mockPlayer1WithCharacter}
        player2={mockPlayer2WithCharacter}
      />
    );

    expect(screen.getByText("Ratos Selecionado")).toBeInTheDocument();
    expect(screen.getByText("Polvos Selecionado")).toBeInTheDocument();
  });

  test("shows mixed status when one player ready", () => {
    render(
      <PlayerStatus
        player1={mockPlayer1WithCharacter}
        player2={mockPlayer2WithoutCharacter}
      />
    );

    expect(screen.getByText("Ratos Selecionado")).toBeInTheDocument();
    expect(screen.getByText("Aguardando seleção...")).toBeInTheDocument();
  });
});
