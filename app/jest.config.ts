import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  //setupFiles: ['./src/tests/setupTests.ts'],
  // setupFilesAfterEnv: ["./src/tests/setupTests.ts"], // or "<rootDir>/jest.setup.ts"
  // transform: {
  //   ...tsJestTransformCfg,    
  // },  
};


