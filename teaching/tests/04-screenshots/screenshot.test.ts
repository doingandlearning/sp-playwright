import { test, expect } from "@playwright/test";

test("take screenshots of Scottish Power", async ({ page }, testInfo) => {
  if (testInfo.project.name === "chromium") {
    test.skip(true, "Firewall blocking chromium automated browser");
  }
  await page.goto("https://scottishpower.co.uk");
  const breakpoints = [
    { width: 320, height: 568 }, // iPhone SE
    { width: 375, height: 667 }, // iPhone 8
    { width: 768, height: 1024 }, // iPad
    { width: 1024, height: 768 }, // iPad landscape
    { width: 1280, height: 720 }, // Desktop
  ];

  for (const breakpoint of breakpoints) {
    await page.setViewportSize(breakpoint);
    await page.screenshot({
      path: `screenshots/screenshot-${testInfo.project.name}-${breakpoint.width}-${breakpoint.height}.png`,
      fullPage: true,
    });
  }
});

test("take screenshot of single element", async ({ page }, testInfo) => {
  if (testInfo.project.name === "chromium") {
    test.skip(true, "Firewall blocking chromium automated browser");
  }

  await page.goto("https://scottishpower.co.uk");
  const header = page.locator("._grid_knjhi_1").first();
  await header.screenshot({
    path: `screenshots/header-${testInfo.project.name}.png`,
  });
});

test("the layout of the page has remained constant", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "chromium") {
    test.skip();
  }
  await page.goto("https://scottishpower.co.uk");

  await expect(page).toHaveScreenshot({
    // maxDiffPixels: 103000,
    maxDiffPixelRatio: 0.11,
  });
});
