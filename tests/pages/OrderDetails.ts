import { expect, type Page } from "@playwright/test";
interface Product {
  name: string;
  price: string;
}
interface CustomerDetails {
  name: string;
  email: string;
}
export async function assertProductDetails(
  page: Page,
  productDetails: Product
) {
  const productName = page.getByText(productDetails.name);
  const productPrice = page.getByText(productDetails.price);
  await expect(productName).toBeVisible();
  await expect(productPrice).toBeVisible();
}

export async function assertCustomerDetails(
  page: Page,
  customerDetails: CustomerDetails
) {
  await expect(page.getByText(customerDetails.name)).toBeVisible();
  await expect(page.getByText(customerDetails.email)).toBeVisible();
}
