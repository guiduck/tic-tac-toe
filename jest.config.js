const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/components/**/*.{js,jsx}",
    "./src/hooks/**/*.{js,jsx}",
    "./src/contexts/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "!./src/main.jsx",
  ],
  coverageThreshold: {
    global: {
      lines: 2,
      statements: 2,
      functions: 13,
      branches: 13,
    },
  },
  coverageReporters: ["text-summary", "json", "html"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/src/components/**/*.test.[jt]s?(x)",
    "**/src/pages/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

export default config;
