import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  // Server latihan (Heroku free) lambat & mudah kewalahan — jalankan serial
  // supaya tidak rebutan request. Retry hanya di CI untuk gangguan jaringan;
  // di lokal retry 0 agar flakiness terlihat apa adanya.
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "https://the-internet.herokuapp.com",
    headless: true,
    navigationTimeout: 60_000,
    actionTimeout: 15_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
