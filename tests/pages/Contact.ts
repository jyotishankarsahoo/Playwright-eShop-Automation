import { Page } from "@playwright/test";

export async function fillInOrderDetails(
  page: Page,
  orderId: string,
  email: string
) {
  //data-test-id="contact-order-id-input"
  await page.locator('[data-test-id="contact-order-id-input"]').fill(orderId);
  await page.locator('[data-test-id="contact-email-input"]').fill(email);
}

export async function trackOrder(page: Page) {
  await page.locator('[data-test-id="contact-track-order-button"]').click();
}
