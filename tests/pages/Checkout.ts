import { type Page } from "@playwright/test";

export const testValue = {
  firstName: "John",
  lastName: "Doe",
  email: "john@apple.com",
  address: "Some Street 1",
  city: "New York",
  zipCode: "12345",
  country: "United States",
  payment: {
    nameOnCard: "John Doe",
    cardNumber: "1234 5678 2345 5678",
    expiry: "01/40",
    cvc: "123",
  },
};

export async function addContactInfo(page: Page) {
  await page.getByLabel("First Name").fill(testValue.firstName);
  await page.getByLabel("Last Name").fill(testValue.lastName);
  await page
    .locator('[data-test-id="checkout-email-input"]')
    .fill(testValue.email);
}
export async function addShippingInfo(page: Page) {
  await page
    .locator('[data-test-id="checkout-address-input"]')
    .fill(testValue.address);
  await page
    .locator('[data-test-id="checkout-city-input"]')
    .fill(testValue.city);
  await page
    .locator('[data-test-id="checkout-zipcode-input"]')
    .fill(testValue.zipCode);
  await page
    .locator('[data-test-id="checkout-country-input"]')
    .fill(testValue.country);
}
export async function addPaymentInfo(page: Page) {
  await page
    .locator('[data-test-id="checkout-cardname-input"]')
    .fill(testValue.payment.nameOnCard);
  await page
    .locator('[data-test-id="checkout-cardnumber-input"]')
    .fill(testValue.payment.cardNumber);
  await page
    .locator('[data-test-id="checkout-cardexpiry-input"]')
    .fill(testValue.payment.expiry);
  await page
    .locator('[data-test-id="checkout-cardcvc-input"]')
    .fill(testValue.payment.cvc);
}

export async function placeOrder(page: Page) {
  await page.locator('[data-test-id="place-order-button"]').click();
}
