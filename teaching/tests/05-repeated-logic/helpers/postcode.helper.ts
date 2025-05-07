import { Page } from "@playwright/test";

export async function fillInPostcodeAndSubmit(page: Page, postcode: string) {
  await page.getByRole("textbox", { name: "Postcode" }).fill(postcode);
  await page.getByRole("button", { name: "Get a quote today" }).click();
}
