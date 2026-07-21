// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
/*
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000, //overwrite timeout, 30 sec by default
  expect: { //assertion timeout
    timeout: 10_000,
  },
  reporter:
    'html'
  ,

  use: {//block for settings that dictate how browser behaves
    baseURL: 'https://rahulshettyacademy.com/',
    browserName: 'chromium',
    headless: false,
    screenshot: "on",
    trace: 'retain-on-failure', //

  }

});

