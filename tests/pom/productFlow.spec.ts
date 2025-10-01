import { test, expect } from "@playwright/test";
import * as product from "../pages/Product";
import * as cart from "../pages/Cart";

test("Items added to the shopping cart", async ({ page }) => {
  await page.goto("/products");
  const productAdded = await product.addProductToCart(page, 3);
  await page
    .locator("[data-test-id='header-cart-button']")
    .getByRole("button")
    .click();
  await cart.assertProduct(page, productAdded.name);
  const subTotal = await cart.getSubtotal(page);
  expect(subTotal).toBe(productAdded.price);
});
