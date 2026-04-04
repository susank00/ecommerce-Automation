const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {
  // ── Selectors ──────────────────────────────────────────────
  get checkoutHeading() {
    return "#checkout-checkout h1";
  }
  get billingAddress() {
    return ".card-title";
  }
  get termsLabel() {
    return 'label[for="input-agree"]';
  }
  get confirmOrderBtn() {
    return "#button-confirm";
  }
  get continueforward() {
    return "#button-save";
  }

  // ── Address form selectors ──────────────────────────────────
  get firstNameField() {
    return "#input-payment-firstname";
  }
  get lastNameField() {
    return "#input-payment-lastname";
  }
  get address1Field() {
    return "#input-payment-address-1";
  }
  get cityField() {
    return "#input-payment-city";
  }
  get postcodeField() {
    return "#input-payment-postcode";
  }
  get countryDropdown() {
    return "#input-payment-country";
  }
  get zoneDropdown() {
    return "#input-payment-zone";
  }

  // ── Actions ────────────────────────────────────────────────

  /**
   * Continue through billing address step
   * Always selects New Address to ensure consistent flow every run
   */
  continueBillingAddress() {
    cy.contains("h4", "Billing Address").should("be.visible");

    // Always click New Address if option exists — ensures consistent flow
    // Always click New Address if option exists — ensures consistent flow
    cy.get("body").then(($body) => {
      if ($body.find("#input-payment-address-new").length > 0) {
        cy.get("#input-payment-address-new").click({ force: true });
      }
    });

    // Fill form if fields are visible
    cy.get("body").then(($body) => {
      if ($body.find(this.firstNameField).length > 0) {
        this.type(this.firstNameField, "Susan");
        this.type(this.lastNameField, "Khatri");
        this.type(this.address1Field, "123 Test Street");
        this.type(this.cityField, "Kathmandu");
        this.type(this.postcodeField, "44600");
        cy.get(this.countryDropdown).select("Nepal");
        cy.get(this.zoneDropdown).select("Bagmati");
      }
      this.click(this.termsLabel);
    });
  }

  /**
   * Click continue/save button to proceed
   */
  Continueforward() {
    this.click(this.continueforward);
  }

  /**
   * Click I agree to terms
   */
  continuePaymentMethod() {
    cy.contains("label", "I have read and agree to the").click({ force: true });
  }

  // ── Assertions ─────────────────────────────────────────────

  /**
   * Assert we are on checkout page
   */
  assertOnCheckoutPage() {
    cy.url().should("include", "route=checkout/checkout");
  }

  /**
   * Assert we have reached the payment/confirm order page
   */
  assertOnPaymentPage() {
    cy.contains("h1", "Confirm Order").should("be.visible");
  }
}

module.exports = CheckoutPage;
