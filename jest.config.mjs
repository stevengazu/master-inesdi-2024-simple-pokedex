/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/src/__mocks__/svg-mock.cjs",
    "\\.(css|scss|png)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [],
  testEnvironment: "jsdom",
};
