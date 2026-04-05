const SearchPage = require("../../../pages/SearchPage");
const CartPage = require("../../../pages/CartPage");
const CheckoutPage = require("../../../pages/CheckoutPage");

const searchPage = new SearchPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

describe("E2E Complete Shopping Flow", () => {
  before(() => {
    cy.login();
  });

  it("should search a product, add to cart and reach payment page", () => {
    cy.fixture("checkoutData").then((data) => {
      // ── Step 1: Visit home and search
      cy.visit("/");
      searchPage.search("iPod Shuffle");
      searchPage.assertResultsPageLoaded();
      searchPage.assertResultsVisible();

      // ── Step 2: Open first product
      searchPage.clickSecondProduct();
      cy.url().should("include", "route=product/product");

      // ── Step 3: Add to cart
      cartPage.addToCart();
      cartPage.assertItemAddedToCart();

      // ── Step 4: Go to cart
      cartPage.goToCart();
      cartPage.assertOnCartPage();
      cartPage.assertCartNotEmpty();

      // ── Step 5: Checkout
      cartPage.proceedToCheckout();
      checkoutPage.assertOnCheckoutPage();
      checkoutPage.continueBillingAddress(data.billing);
      checkoutPage.continueForward();

      // ── Step 6: Agree to terms
      checkoutPage.continuePaymentMethod();

      // ── Final assertion + screenshot
      checkoutPage.assertOnPaymentPage();
      cy.screenshot("payment-page-reached", { capture: "viewport" });
    });
  });
});
