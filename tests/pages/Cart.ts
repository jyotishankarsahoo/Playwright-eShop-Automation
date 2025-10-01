import { expect, type Page } from "@playwright/test";

export async function assertProduct(page: Page, heading: string) {
  const productHeading = page.getByRole("heading", {
    name: heading,
  });
  await expect(productHeading).toBeVisible();
}
export async function getSubtotal(page: Page) {
  const productPrice = page
    .getByText("Subtotal")
    .locator("..")
    .locator(".font-semibold");
  const subTotal = await productPrice.innerText();
  return subTotal;
}

export async function proceedToCheckout(page: Page) {
  await page.locator('[data-test-id="proceed-to-checkout"]').click();
}
