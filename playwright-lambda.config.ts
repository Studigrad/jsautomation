import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


export default defineConfig({
  testDir: './tests/testgroup',
  timeout: 5 * 8 * 1000,
  fullyParallel: false,
  // forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    // baseURL: 'https://staging.timelycare.com/',
    trace: 'on-first-retry',
    screenshot:"only-on-failure"
  },
  projects: [
    {
        name: 'chromium',
        use: { 
          ...devices['Desktop Chrome'],
          headless: false 
        },  
      },
    // {
    //     name: "chrome:latest:MacOS Catalina@lambdatest",
    //     use: {
    //         viewport: { width: 1920, height: 1080 },
    //         launchOptions: {
    //           args: ['--disable-web-security',
    //               '--use-fake-ui-for-media-stream',
    //               '--use-fake-device-for-media-stream'
    //           ],
    //         }
    //     },
    // },
    // {
    //     name: "chrome:latest:Windows 10@lambdatest",
    //     use: {
    //         viewport: { width: 1920, height: 1080},
    //     },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },


    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
