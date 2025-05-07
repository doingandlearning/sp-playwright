import { test, expect } from "@playwright/test";

test("the email validation message displays appropriately", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "chromium") {
    test.skip(true, "Failing in Chromium due to log in.");
  }
  await page.goto("https://www.scottishpower.co.uk/login");

  const emailInput = page.getByRole("textbox", { name: "Email address" });
  const emailValidationMessage = page.getByText("Please enter a valid email");
  // DRY - Don't Repeat Yourself

  const invalidEmails = [
    // Parametri(z/s)ing our test
    "plainaddress",
    "@domain.com",
    "name@",
    "name@domain",
    "name@.com",
  ];

  for (const email of invalidEmails) {
    // change it in here email - let
    await emailInput.fill(email);
    // .blur(), .tab(),
    await emailInput.blur(); // Trigger React/Vue/Angular onChange events
    await expect(emailValidationMessage).toBeVisible();
  }
  await emailInput.fill("valid@domain.com");
  await expect(emailValidationMessage).not.toBeVisible();
});
