import { test, expect, Page } from "@playwright/test";
import {
  attemptToPurchase,
  fillAddressDetails,
  fillCardDetails,
  goToCheckout,
  selectProduct,
} from "./helpers/checkout.helpers";
import { CheckoutPage } from "./pages/CheckoutPage";
import { fillInPostcodeAndSubmit } from "./helpers/postcode.helper";

test("test with helpers", async ({ page }) => {
  test.skip();
  await page.goto("https://shop.easy.nets.eu/");
  await selectProduct(page);
  await goToCheckout(page);
  await fillAddressDetails(page);
  await fillCardDetails(page);
  await attemptToPurchase(page);

  // login()
  // setupTestUser()
  // assertToastMessage()

  expect(page).toHaveScreenshot();
});

test("test with POM", async ({ page }) => {
  await page.goto("https://shop.easy.nets.eu/");
  await selectProduct(page);
  await goToCheckout(page);
  const checkoutPage = new CheckoutPage(page);
  checkoutPage.fillAddress("");

  expect(checkoutPage.firstAddressLine).toContain("3 Glenview");
});

test("test that combo box is visible", async ({ page }, testInfo) => {
  if (testInfo.project.name === "chromium") {
    test.skip();
  }
  await page.goto("https://www.scottishpower.co.uk/");
  await fillInPostcodeAndSubmit(page, "BT18 0PX");
  const combobox = page.getByRole("combobox");
  await expect(combobox).toBeVisible();
  await combobox.click();
  await combobox.click();

  await combobox.screenshot({
    path: `screenshots/combobox-${testInfo.project.name}.png`,
  });
});
