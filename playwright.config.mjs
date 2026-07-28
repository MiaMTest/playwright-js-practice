// @ts-check
import { defineConfig } from '@playwright/test';
/*
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000, //overwrite timeout, 30 sec by default
  expect: { //assertion timeout
    timeout: 10_000,
  },
  reporter: 'html',
  retries: 1,
 // workers:6,
  //fullyParallel:true,

  use: {//block for settings that dictate how browser behaves
    baseURL: 'https://rahulshettyacademy.com/',
    browserName: 'chromium',
    headless: true,
    screenshot: "on", //off, only-on-failure
    trace: 'retain-on-failure', // off,on,on-first-retry, on-all-retries

  }

});

