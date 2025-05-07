import { test, expect } from "@playwright/test";

test("confirm business heading", async ({ page }) => {
  await page.goto("https://www.scottishpower.co.uk/");
  await page.getByRole("link", { name: "Business" }).click();
  const heading = page.getByRole("heading", {
    name: "Get a business energy quote",
  });
  await expect(heading).toBeVisible();
});
