export default {
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock'],
  coverageThreshold: {
    global: {
      functions: 100,
      lines: 90,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/**.d.ts',
  ],
};
