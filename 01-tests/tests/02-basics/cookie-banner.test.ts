import { test, expect } from "@playwright/test";

test("cookie banner goes and stays gone between visits", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "chromium") {
    test.skip(true, "Failing in Chromium due to log in.");
  }
  await page.goto("https://www.scottishpower.co.uk/");

  const banner = page.getByRole("dialog", { name: "Cookie Consent Banner" });

  await expect(banner).toBeVisible();

  await page.getByRole("button", { name: "Accept All" }).click();
  await expect(banner).not.toBeVisible();

  // await page.goto("https://www.scottishpower.co.uk/");
  await page.reload();
  await expect(banner).not.toBeVisible();
});
