import BasePage from "./BasePage.js";

class LoginPage extends BasePage {
  // ── Selectors ──────────────────────────────────────────────
  get emailInput() {
    return "#input-email";
  }
  get passwordInput() {
    return "#input-password";
  }
  get loginButton() {
    return 'input[type="submit"]';
  }
  get accountHeading() {
    return "#content h2";
  }
  get errorAlert() {
    return ".alert-danger";
  }

  // ── Actions ────────────────────────────────────────────────

  /**
   * Navigate directly to the login page
   */
  visit() {
    cy.visit("/index.php?route=account/login");
  }

  /**
   * Type email into the email field
   */
  enterEmail(email) {
    this.type(this.emailInput, email);
  }

  /**
   * Type password into the password field
   */
  enterPassword(password) {
    this.type(this.passwordInput, password);
  }

  /**
   * Click the Login submit button
   */
  clickLoginButton() {
    this.click(this.loginButton);
  }

  /**
   * Full login action combining all steps
   */
  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  // ── Assertions ─────────────────────────────────────────────

  /**
   * Assert we are on the login page
   */
  assertOnLoginPage() {
    cy.url().should("include", "route=account/login");
    this.getElement(this.accountHeading).should(
      "contain.text",
      "Returning Customer",
    );
  }

  /**
   * Assert successful login by checking URL redirect
   */
  assertLoginSuccess() {
    cy.url().should("include", "route=account/account");
  }

  /**
   * Assert error message is visible for failed login
   */
  assertLoginError() {
    this.getElement(this.errorAlert)
      .should("be.visible")
      .and("contain.text", "Warning");
  }
}

module.exports = LoginPage;
