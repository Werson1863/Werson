import { test, expect } from "@playwright/test";

function uniqueEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
}

test("register, solve a lesson, and progress survives logout/login", async ({ page }) => {
  const email = uniqueEmail("e2e-flow");
  const password = "password123";

  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);

  await page.getByText("Regisztráció").click();
  await page.getByTestId("email-input").fill(email);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("submit-button").click();

  await expect(page.getByTestId("user-email")).toHaveText(email);

  await page.getByText("SQL alapok").click();
  await page.getByTestId("lesson-list").locator("li").first().click();
  await expect(page.getByTestId("run-button")).toBeEnabled({ timeout: 15000 });

  await page.locator(".cm-content").click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("SELECT * FROM movies;");
  await page.getByTestId("run-button").click();

  await expect(page.getByTestId("lesson-completed")).toBeVisible();

  // Progress must be persisted server-side, not just in the page's memory.
  await page.getByTestId("logout-button").click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByTestId("email-input").fill(email);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("submit-button").click();

  await page.getByText("SQL alapok").click();
  await expect(page.getByTestId("progress-label")).toContainText("1 / 3");
  const statuses = page.getByTestId("lesson-list").locator("li").first();
  await expect(statuses).toContainText("A SELECT utasítás");
});

test("an incorrect solution fails the hidden tests with a readable message", async ({ page }) => {
  const email = uniqueEmail("e2e-fail");
  const password = "password123";

  await page.goto("/register");
  await page.getByTestId("email-input").fill(email);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("submit-button").click();

  await page.getByText("SQL alapok").click();
  await page.getByTestId("lesson-list").locator("li").first().click();
  await expect(page.getByTestId("run-button")).toBeEnabled({ timeout: 15000 });

  await page.locator(".cm-content").click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("SELECT * FROM movies WHERE year > 2015;");
  await page.getByTestId("run-button").click();

  await expect(page.getByTestId("test-results")).toBeVisible();
  await expect(page.getByTestId("lesson-completed")).toHaveCount(0);
  await expect(page.getByTestId("test-results")).toContainText("sort vártunk");
});
