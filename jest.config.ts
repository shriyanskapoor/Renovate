import inspector from "inspector";
import { type Config } from "jest";

const isDebuggerAttached = inspector.url() !== undefined;

const ciEnv = process.argv.includes("--ci");

const reporters: Config["reporters"] = ciEnv
  ? [
      ["github-actions", { silent: false }],
      ["jest-junit", { outputDirectory: "<rootDir>/artifacts/jest/reports" }],
      "summary",
    ]
  : ["default", "summary"];

const config: Config = {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: ciEnv,
  coverageDirectory: "artifacts/jest/coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["/src/test/", "\\.css\\.ts$", "\\.d\\.ts$"],
  coverageReporters: ["json", "json-summary", "text", "lcov", "clover"],
  reporters,
  cacheDirectory: "artifacts/jest/cache",
  errorOnDeprecated: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg|bmp|woff|woff2|ttf)$":
      "<rootDir>/src/test/mocks/fileMock.js",
    "(?<!_vanilla)\\.css$": "identity-obj-proxy",
    "\\.(less|scss|sass|sass.js|scss.js|sass.mjs|scss.mjs)$": "identity-obj-proxy",
    "test/(.*)$": "<rootDir>/src/test/$1",
    "~/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "\\.css\\.[cm]?[tj]s$": "@vanilla-extract/jest-transform",
    "\\.[tj]sx?$": ["babel-jest", { extends: "@jsq/fe-build/babel/browser" }],
  },
  transformIgnorePatterns: ["node_modules/(?!(@jsq/.*))"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  globalTeardown: "<rootDir>/src/test/teardown.ts",
  testEnvironment: "jsdom",
  verbose: true,
  testTimeout: isDebuggerAttached ? 10000000 : 5000,
};

export default config;
