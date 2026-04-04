import LoginPage from "../../../pages/login";

const loginPage = new LoginPage();

describe("Login Flow", () => {
  beforeEach(() => {
    // Load credentials from fixture file
    cy.fixture("credentials").as("credentials");
  });

  // ── Positive Test ────────────────────────────────────────────

  it("should login successfully with valid credentials", function () {
    // Visit login page
    loginPage.visit();

    // Assert we are on the login page
    loginPage.assertOnLoginPage();

    // Perform login
    loginPage.login(
      this.credentials.validUser.email,
      this.credentials.validUser.password,
    );

    // Assert successful login
    loginPage.assertLoginSuccess();
  });

  // ── Negative Test ────────────────────────────────────────────

  it("should show error with invalid credentials", function () {
    // Visit login page
    loginPage.visit();

    // Perform login with wrong credentials
    loginPage.login(
      this.credentials.invalidUser.email,
      this.credentials.invalidUser.password,
    );

    // Assert error message is shown
    loginPage.assertLoginError();
  });
});
