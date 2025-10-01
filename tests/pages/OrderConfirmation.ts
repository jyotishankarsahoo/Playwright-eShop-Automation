import { Page } from "@playwright/test";

export async function getOrderDetails(page: Page) {
  const orderWrapper = page.getByText("Your Order ID is:").locator("..");
  const orderId = await orderWrapper.getByRole("paragraph").nth(1).innerText();
  const emailWrapper = page.getByText("A confirmation email will be sent to ");
  const emailId = await emailWrapper.locator("strong").innerText();
  return {
    orderId: orderId,
    emailId: emailId,
  };
}

export async function trackOrderDetails(page: Page) {
  await page.getByRole("button", { name: "Track Your Order" }).click();
}
