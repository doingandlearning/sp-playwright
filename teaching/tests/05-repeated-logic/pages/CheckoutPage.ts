import { Locator, Page } from "@playwright/test";
import { fillAddressDetails } from "../helpers/checkout.helpers";

export class CheckoutPage {
  postcode: Locator;

  constructor(private page: Page) {
    // Some comment to help explain what's going on.
    this.postcode = this.page
      .locator("#nets-checkout-iframe")
      .contentFrame()
      .getByRole("textbox", { name: "Post code" });
  }

  async fillAddress(firstLine: string) {
    await fillAddressDetails(this.page);
  }

  firstAddressLine() {
    return this.page
      .locator("#nets-checkout-iframe")
      .contentFrame()
      .getByRole("textbox", { name: "Address" });
  }

  async submit() {
    await this.page
      .locator("#nets-checkout-iframe")
      .contentFrame()
      .getByRole("button", { name: "Pay 108.90 kr" })
      .click();
  }
}
