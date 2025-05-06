import { test, expect } from "@playwright/test";

// Given -> When -> Then
// Arrange -> Act -> Assert

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  // const link = page.locator("/html/body/div[2]/div[2]/header/div/div/a") // XPath
  // const link = page.locator("a[0]");

  // Brittle
  // link.click();

  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading")).toBeVisible();
});
