import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KeyboardHints from "./index";

describe("KeyboardHints", () => {
  test("renders keyboard shortcuts", () => {
    render(<KeyboardHints />);

    expect(screen.getByText(/Rato/)).toBeInTheDocument();
    expect(screen.getByText(/Polvo/)).toBeInTheDocument();
    expect(screen.getByText(/Trocar jogador/)).toBeInTheDocument();
    expect(screen.getByText(/Iniciar/)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/)).toBeInTheDocument();
  });

  test("renders keyboard key elements", () => {
    render(<KeyboardHints />);

    const key1 = screen.getByText("1");
    const key2 = screen.getByText("2");
    const tabKey = screen.getByText("Tab");

    expect(key1).toBeInTheDocument();
    expect(key2).toBeInTheDocument();
    expect(tabKey).toBeInTheDocument();
  });
});
