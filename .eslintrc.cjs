module.exports = {
  extends: [
    "eslint:recommended",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:@tanstack/query/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "variable", filter: "__typename", format: null },
      {
        selector: "variable",
        types: ["function"],
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: [
          "is",
          "should",
          "has",
          "can",
          "did",
          "will",
          "enable",
          "disable",
          "allow",
          "disallow",
        ],
      },
      {
        selector: "variable",
        types: ["number", "string", "array"],
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message: "Don't use enums, use union types instead",
      },
    ],
    "import/no-default-export": "error",
    "no-nested-ternary": "warn",
    "no-unneeded-ternary": "warn",
    "max-params": ["error", 3],
    "max-depth": ["warn", 3],
    "max-lines-per-function": [
      "warn",
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    "no-magic-numbers": [
      "warn",
      {
        ignore: [0, 1, -1, 2, 10, 100],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
    ],
  },
  overrides: [
    {
      files: ["**/app/**/{page,layout,not-found}.tsx"],
      rules: { "import/no-default-export": "off" },
    },
  ],
};
