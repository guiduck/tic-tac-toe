import { createContext, useState, useEffect, useMemo } from "react";

export const ColorCustomizationContext = createContext();

const DEFAULT_COLORS = {
  rat: "#b87dc7",
  octopus: "#e85b9a",
};

/**
 * @param {React.ReactNode} children - Componentes filhos
 */
export function ColorCustomizationProvider({ children }) {
  const [customColors, setCustomColors] = useState(DEFAULT_COLORS);

  useEffect(() => {
    const savedColors = localStorage.getItem("customCharacterColors");
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
        setCustomColors({ ...DEFAULT_COLORS, ...parsedColors });
      } catch (error) {
        console.warn("Erro ao carregar cores personalizadas:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customCharacterColors", JSON.stringify(customColors));

    document.documentElement.style.setProperty(
      "--rat-custom",
      customColors.rat
    );
    document.documentElement.style.setProperty(
      "--octopus-custom",
      customColors.octopus
    );
  }, [customColors]);

  /**
   * @param {string} character - 'rat' ou 'octopus'
   * @param {string} color - Cor em formato hex
   */
  const updateCharacterColor = (character, color) => {
    setCustomColors((prev) => ({
      ...prev,
      [character]: color,
    }));
  };

  const resetColors = () => {
    setCustomColors(DEFAULT_COLORS);
  };

  /**
   * @param {string} character - 'rat' ou 'octopus'
   * @returns {string} Cor em formato hex
   */
  const getCharacterColor = (character) => {
    return customColors[character] || DEFAULT_COLORS[character];
  };

  const value = useMemo(
    () => ({
      customColors,
      updateCharacterColor,
      resetColors,
      getCharacterColor,
    }),
    [customColors, updateCharacterColor, resetColors, getCharacterColor]
  );

  return (
    <ColorCustomizationContext.Provider value={value}>
      {children}
    </ColorCustomizationContext.Provider>
  );
}
