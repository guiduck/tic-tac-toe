import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DialogueSystem from "./index";

describe("DialogueSystem", () => {
  const mockDialogue = {
    isVisible: true,
    speakerName: "Rato",
    speakerImage: "/rat.png",
    currentText: "Esta é uma mensagem de teste!",
  };

  test("renders dialogue when visible", () => {
    render(<DialogueSystem dialogue={mockDialogue} />);

    expect(screen.getByText("Rato")).toBeInTheDocument();
    expect(
      screen.getByText("Esta é uma mensagem de teste!")
    ).toBeInTheDocument();
  });

  test("does not render when not visible", () => {
    const hiddenDialogue = { ...mockDialogue, isVisible: false };
    const { container } = render(<DialogueSystem dialogue={hiddenDialogue} />);

    expect(container.firstChild).toBeNull();
  });

  test("renders without speaker image", () => {
    const dialogueWithoutImage = { ...mockDialogue, speakerImage: null };
    render(<DialogueSystem dialogue={dialogueWithoutImage} />);

    expect(screen.getByText("Rato")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
