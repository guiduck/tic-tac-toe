import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SingleVictoryScreen from "./singleVictoryScreen";

describe("SingleVictoryScreen", () => {
  test("renders victory message with player name", () => {
    render(<SingleVictoryScreen name="Ratos" />);

    expect(
      screen.getByText("🏆 Ratos venceu esta partida!")
    ).toBeInTheDocument();
  });

  test("renders victory message with different player name", () => {
    render(<SingleVictoryScreen name="Polvos" />);

    expect(
      screen.getByText("🏆 Polvos venceu esta partida!")
    ).toBeInTheDocument();
  });

  test("renders trophy icon", () => {
    render(<SingleVictoryScreen name="Test Player" />);

    expect(screen.getByText(/🏆/)).toBeInTheDocument();
  });
});
