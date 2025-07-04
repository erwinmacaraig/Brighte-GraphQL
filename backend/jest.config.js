const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // transform: {
  //   ...tsJestTransformCfg,
  // },
  transform: {
    '^.+\\.ts$': 'ts-jest', // For TypeScript files
    // Add other transformers if needed, e.g., for JavaScript files
  },
  // transformIgnorePatterns: [
  //   '/opt/app/node_modules/(?!my-esm-module-name).+\\.js$', // Example for a specific module
  // ],
};