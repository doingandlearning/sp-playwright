import { Page } from "@playwright/test";

async function selectProduct(page: Page) {
  await page
    .locator("div")
    .filter({ hasText: /^99 krAdd$/ })
    .getByRole("button")
    .click();
  return;
}

async function goToCheckout(page: Page) {
  await page.getByText("1Checkout").click();
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Address" })
    .waitFor({ state: "visible" });
}

async function fillAddressDetails(
  page: Page,
  testUser?: { firstName: string; lastName: string }
) {
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "First name" })
    .fill("Kevin");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Last name" })
    .fill("Cunningham");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Address" })
    .fill("3 Glenview");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Postal code" })
    .fill("BT18 0PX");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "City" })
    .fill("Holywood");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Email" })
    .fill("kevin@kevincunningham.co.uk");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .locator("#react-select-3-input")
    .fill("+7739814877");
  return;
}

async function fillCardDetails(page: Page) {
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Card number" })
    .fill("5187 1232 4582 3123");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "Expiry (mm/yy)" })
    .fill("01/30");

  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("textbox", { name: "CVC" })
    .fill("121");
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("checkbox", { name: "I accept the Terms of use and" })
    .check();
  return;
}

async function attemptToPurchase(page: Page) {
  await page
    .locator("#nets-checkout-iframe")
    .contentFrame()
    .getByRole("button", { name: "Pay 108.90 kr" })
    .click();
  return;
}

export {
  selectProduct,
  goToCheckout,
  fillAddressDetails,
  fillCardDetails,
  attemptToPurchase,
};
