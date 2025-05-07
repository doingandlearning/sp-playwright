import { test as base, expect, Page } from "@playwright/test";

type CustomFixtures = {
  formPage: Page;
  user: { email: string; password: string };
};

export const test = base.extend<CustomFixtures>({
  formPage: async ({ page }, use) => {
    await page.goto("/contact");
    await page.locator("#name").fill("Test User");
    await page.locator("#email").fill("test@test.com");
    await use(page);
  },
  user: {
    email: "test@test.com",
    password: "123456",
  },
});
