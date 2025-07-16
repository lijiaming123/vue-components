module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/packages/$1",
  },
  testMatch: ["<rootDir>/packages/**/*.spec.ts"],
};
