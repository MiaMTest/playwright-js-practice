// @ts-check
import { defineConfig, devices } from '@playwright/test';
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
  retries:1,

  projects: [

    {
      name: 'chromium',

      use: {
        baseURL: 'https://rahulshettyacademy.com/',
        browserName: 'chromium',
        headless: false,
        screenshot: "on", 
        trace: 'retain-on-failure', 
        viewport:{width:720,height:720},//define window dimension for Web Responsive Testing
        


      }
    },
    {
      name: 'safari',
        use: {
        baseURL: 'https://rahulshettyacademy.com/',
        browserName: 'webkit',
        headless: false,
        screenshot: "on", 
        trace: 'retain-on-failure', 
        ...devices['iPad Pro 11'],
        locale:'fr-CA',
        timezoneId:'America/Toronto',
      }

    }
  ]


});

