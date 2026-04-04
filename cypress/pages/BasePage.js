// cypress/pages/BasePage.js

class BasePage {
  // Visit a URL path
  visit(path = "") {
    cy.visit(path);
  }

  // Click an element — waits for it to be visible first
  click(selector) {
    cy.get(selector).should("be.visible").click();
  }

  // Clear and type into a field
  type(selector, text) {
    cy.get(selector).should("be.visible").clear().type(text);
  }

  // Get element with visibility check
  getElement(selector) {
    return cy.get(selector).should("be.visible");
  }

  // Assert URL contains a path
  waitForUrl(path) {
    cy.url().should("include", path);
  }

  // Take a screenshot with a custom name
  takeScreenshot(name) {
    cy.screenshot(name);
  }
}

module.exports = BasePage;
