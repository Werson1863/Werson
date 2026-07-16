import { defineConfig, devices } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm run dev --workspace=apps/api",
      cwd: repoRoot,
      url: "http://localhost:3000/api/health",
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      command: "npm run dev",
      cwd: __dirname,
      url: "http://localhost:5173",
      reuseExistingServer: true,
      timeout: 30_000,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Set PLAYWRIGHT_CHROMIUM_PATH to pin a specific local Chromium binary
        // (e.g. in sandboxed environments with a pre-installed browser whose
        // revision doesn't match this Playwright version). Falls back to
        // Playwright's normal auto-detected browser otherwise.
        launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
          ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
          : {},
      },
    },
  ],
});
