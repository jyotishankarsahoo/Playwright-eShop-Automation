import { test, expect } from "@playwright/test";

test("Item is added to shopping cart", async ({ page }) => {
  await page.goto("/products");
  const firstProductWrapper = page.locator(".p-6").first();
  const productName = await firstProductWrapper
    .getByRole("heading")
    .first()
    .innerText();
  const productPrice = await firstProductWrapper
    .locator(".font-bold")
    .first()
    .innerText();
  await firstProductWrapper
    .getByRole("button", { name: "Add to Cart" })
    .click();
  await page
    .locator('[data-test-id="header-cart-button"]')
    .locator("button")
    .click();
  const firstProductName = page.getByRole("heading", { name: productName });
  const firstProductPrice = page
    .getByText("Subtotal")
    .locator("..")
    .locator(".font-semibold");
  await expect(firstProductName).toBeVisible();
  const actualPrice = await firstProductPrice.innerText();
  expect(`${actualPrice}`).toEqual(productPrice);
});
