module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./spec/LoadEnv.ts'],
  moduleNameMapper: {
    "^@daos(.*)": "<rootDir>/src/daos",
    "^@entities(.*)$": "<rootDir>/src/entities",
    "^@shared(.*)$": "<rootDir>/src/shared",
    "^@server(.*)$": "<rootDir>/src/Server" 
  }
};