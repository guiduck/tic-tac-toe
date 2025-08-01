import { useContext } from "react";
import { DialogueContext } from "../contexts/DialogueContext";

export function useDialogue() {
  const context = useContext(DialogueContext);
  if (!context) {
    throw new Error(
      "useDialogue deve ser usado dentro de DialogueContextProvider"
    );
  }
  return context;
}
