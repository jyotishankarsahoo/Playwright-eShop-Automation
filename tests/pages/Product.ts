import { type Page } from "@playwright/test";

export async function addProductToCart(page: Page, index: number) {
  const productWrapper = page.locator(".p-6").nth(index);
  const productName = await productWrapper
    .getByRole("heading")
    .first()
    .innerText();
  const productPrice = await productWrapper
    .locator(".font-bold")
    .first()
    .innerText();
  await productWrapper.getByRole("button", { name: "Add to Cart" }).click();
  return {
    name: productName,
    price: productPrice,
  };
}
