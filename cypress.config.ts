import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: "http://localhost:3000",
    apiUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiylN50xSWKqsN9mqCVWLOYj9Bwfle_6c',
  }
});
