/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  moduleNameMapper: {
    "src/(.*)": "mtx_demo/src/$1",
    "test/(.*)": "mtx_demo/test/$1"
  },
  verbose: true,
  forceExit: true,
  clearMocks: true
};
