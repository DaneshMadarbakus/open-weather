module.exports = {
  automock: false,
  roots: ["<rootDir>/src"],
  transform: {
    "\\.(js|jsx|ts|tsx)?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/setupTests.js",
  ],
};
