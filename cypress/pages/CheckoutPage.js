const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {
  // ── Selectors
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
  get continueForwardBtn() {
    return "#button-save";
  }

  // ── Address form selectors
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

  // Actions

  /**
   * Fill billing address form with provided data
   */
  fillBillingAddress(data) {
    cy.get(this.firstNameField).scrollIntoView().type(data.firstName);
    cy.get(this.lastNameField).scrollIntoView().type(data.lastName);
    cy.get(this.address1Field).scrollIntoView().type(data.address1);
    cy.get(this.cityField).scrollIntoView().type(data.city);
    cy.get(this.postcodeField).scrollIntoView().type(data.postcode);
    cy.get(this.countryDropdown).scrollIntoView().select(data.country);
    cy.get(this.zoneDropdown).scrollIntoView().select(data.zone);
  }

  /**
   * Continue through billing address step.
   * Selects New Address if the option exists, fills the form, then accepts terms.
   */
  continueBillingAddress(data) {
    cy.contains("h4", "Billing Address").should("be.visible");

    cy.get("body").then(($body) => {
      if ($body.find("#input-payment-address-new").length > 0) {
        cy.get("#input-payment-address-new").click({ force: true });
      }
    });

    // wait for form to animate/render before interacting
    cy.get(this.firstNameField).should("be.visible");

    cy.get("body").then(($body) => {
      if ($body.find(this.firstNameField).length > 0) {
        this.fillBillingAddress(data);
      }
      this.click(this.termsLabel);
    });
  }

  /**
   * Click continue/save button to proceed
   */
  continueForward() {
    this.click(this.continueForwardBtn);
  }

  /**
   * Accept terms and conditions
   */
  continuePaymentMethod() {
    cy.contains("label", "I have read and agree to the").click({ force: true });
  }

  // Assertions

  assertOnCheckoutPage() {
    cy.url().should("include", "route=checkout/checkout");
  }

  assertOnPaymentPage() {
    cy.contains("h1", "Confirm Order").should("be.visible");
  }
}

module.exports = CheckoutPage;
