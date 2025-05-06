import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.kevincunningham.co.uk/");
  await page.getByRole("link", { name: "Courses" }).click();
  await page.goto("https://www.kevincunningham.co.uk/courses");
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "pluralsight-link Building an" })
    .click();
  const page1 = await page1Promise;
  await page1.getByText("by Kevin Cunningham").click();
  await page1.getByText("by Kevin Cunningham").click();
});
