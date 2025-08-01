import { useContext } from "react";
import { ColorCustomizationContext } from "../contexts/ColorCustomizationContext";

/**
 * @returns {Object} Contexto de personalização de cores
 */
export const useColorCustomization = () => {
  const context = useContext(ColorCustomizationContext);
  if (!context) {
    throw new Error(
      "useColorCustomization deve ser usado dentro de ColorCustomizationProvider"
    );
  }
  return context;
};
