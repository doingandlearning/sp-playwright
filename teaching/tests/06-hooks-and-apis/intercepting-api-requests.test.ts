import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.route("/api/users/1", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ id: "1", name: faker.commerce.productName() }),
    });
  });
});

test("intercept api", async ({ page }) => {
  await page.goto("https://google.com");
});
