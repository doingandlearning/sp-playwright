import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_elem_output"
  );

  const buttonA = page
    .locator('iframe[name="iframeResult"]')
    .contentFrame()
    .locator('[id="a"]');

  const buttonB = page
    .locator('iframe[name="iframeResult"]')
    .contentFrame()
    .locator('[id="b"]');

  const testCases = [
    { a: 1, b: 2, result: 3 },
    { a: 100, b: 1000, result: 1100 },
    { a: 0, b: -10, result: -10 },
  ];

  for (const testCase of testCases) {
    await buttonA.fill(String(testCase.a));
    await buttonB.fill(String(testCase.b));
    await expect(page.getByText(String(testCase.result))).toBeVisible(); // TODO: Why is this not working for 1100?
  }
});
