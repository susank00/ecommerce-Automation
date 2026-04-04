const BasePage = require("./BasePage");

class CartPage extends BasePage {
  // ── Selectors ──────────────────────────────────────────────
  get addToCartBtn() {
    return '#entry_216842 button[title="Add to Cart"]';
  }
  //   get cartNavIcon() {
  //     return "#cart > button";
  //   }
  get cartDropdown() {
    return "#cart .dropdown-menu";
  }
  get viewCartBtn() {
    return '#notification-box-top .toast.show:last a[href*="route=checkout/cart"]';
  }
  get checkoutBtn() {
    return '#content a[href*="route=checkout/checkout"]';
  }
  get cartItemName() {
    return ".table-responsive .text-left a";
  }
  get successAlert() {
    return "#notification-box-top .toast-body";
  }

  // ── Actions ────────────────────────────────────────────────

  /**
   * Click Add to Cart on product page
   */
  addToCart() {
    cy.get(this.addToCartBtn).first().click();
  }

  /**
   * Open the cart dropdown from navbar
   */
  openCartDropdown() {
    this.click(this.cartNavIcon);
    cy.get(this.cartDropdown).should("be.visible");
  }

  /**
   * Click View Cart from dropdown
   */
  goToCart() {
    cy.get("#notification-box-top .toast.show", { timeout: 15000 })
      .last()
      .within(() => {
        cy.contains("a", "View Cart").click();
      });
  }

  /**
   * Click Checkout button from cart page
   */
  proceedToCheckout() {
    this.click(this.checkoutBtn);
  }

  // ── Assertions ─────────────────────────────────────────────

  /**
   * Assert success message after adding to cart
   */
  assertItemAddedToCart() {
    cy.get(this.successAlert)
      .should("be.visible")
      .and("contain.text", "Success");
  }

  /**
   * Assert we are on the cart page
   */
  assertOnCartPage() {
    cy.url().should("include", "route=checkout/cart");
  }

  /**
   * Assert cart is not empty
   */
  assertCartNotEmpty() {
    cy.get(this.cartItemName).should("be.visible").and("have.length.above", 0);
  }
}

module.exports = CartPage;
