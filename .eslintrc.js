module.exports = {
  extends: "@jsq/eslint-config",
  root: true,
  env: {
    node: true,
    browser: true,
    "jest/globals": true,
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  rules: {
    "jest/no-restricted-matchers": [
      "error",
      {
        toMatchSnapshot:
          "Do not use toMatchSnapshot to generate snapshots of React DOM. See our organizational policy for more information. \n" +
          "https://junipersquare.atlassian.net/wiki/spaces/ENG/pages/2961342500/No+More+Snapshot+Tests",
      },
    ],
  },
  ignorePatterns: ["artifacts/**", "dist/**"],
};
