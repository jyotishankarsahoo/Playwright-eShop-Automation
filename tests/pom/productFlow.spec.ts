import { test, expect } from "@playwright/test";
import * as product from "../pages/Product";
import * as cart from "../pages/Cart";
import * as checkout from "../pages/Checkout";
import * as orderConfirmation from "../pages/OrderConfirmation";
import * as contact from "../pages/Contact";
import * as orderDetails from "../pages/OrderDetails";

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

test("Complete workflow for product order", async ({ page }) => {
  await page.goto("/products");
  const productAdded = await product.addProductToCart(page, 3);
  await page
    .locator("[data-test-id='header-cart-button']")
    .getByRole("button")
    .click();
  await cart.assertProduct(page, productAdded.name);
  const subTotal = await cart.getSubtotal(page);
  expect(subTotal).toBe(productAdded.price);
  await cart.proceedToCheckout(page);
  await checkout.addContactInfo(page);
  await checkout.addShippingInfo(page);
  await checkout.addPaymentInfo(page);
  await checkout.placeOrder(page);
  const orderInfo = await orderConfirmation.getOrderDetails(page);
  await orderConfirmation.trackOrderDetails(page);
  await contact.fillInOrderDetails(page, orderInfo.orderId, orderInfo.emailId);
  await contact.trackOrder(page);
  await orderDetails.assertProductDetails(page, productAdded);
  const customerName = `${checkout.testValue.firstName} ${checkout.testValue.lastName}`;
  await orderDetails.assertCustomerDetails(page, {
    name: customerName,
    email: checkout.testValue.email,
  });
});
