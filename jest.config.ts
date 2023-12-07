export default {
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/**.d.ts',
  ],
};
