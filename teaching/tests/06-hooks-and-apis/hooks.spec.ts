import { test, expect } from "@playwright/test";

// beforeAll
let homepageUrl;

test.beforeAll(async () => {
  homepageUrl = "https://scottishpower.co.uk";
  console.log("beforeAll: Setting the homepage!");
  console.count("beforeAll");
});

test.beforeEach(async ({ page }) => {
  console.log("Going to the homepage!");
  await page.goto(homepageUrl);
  console.count("beforeEach");
});

test.afterEach(async ({ page }) => {
  console.log("Cleaning localStorage");
  await page.evaluate(() => localStorage.clear());
  console.count("afterEach");
});

test.afterAll(async () => {
  console.log("Finished this test suite");
  console.count("afterAll");
});
// beforeEach
// test
// afterEach
// afterAll

test("hooks demo", async ({ page }) => {
  await page.screenshot({ path: "test.png" });
});

test("check title", async ({ page }) => {
  const title = await page.title();
  expect(title).toBe("Gas & Electricity Provider | Switch to ScottishPower");
});
test("check title again", async ({ page }) => {
  const title = await page.title();
  expect(title).toBe("Gas & Electricity Provider | Switch to ScottishPower");
});
