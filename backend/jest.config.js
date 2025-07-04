const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    ...tsJestTransformCfg,
  },
  // transformIgnorePatterns: [
  //           '/node_modules/(?!my-esm-module-name).+\\.js$', // Example for a specific module
  //         ],
};