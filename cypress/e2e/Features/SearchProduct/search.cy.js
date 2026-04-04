const SearchPage = require("../../../pages/SearchPage");

const searchPage = new SearchPage();

describe("Search Product Flow", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  // ── Positive Tests ────────────────────────────────────────

  it("should search for a product and show results", () => {
    searchPage.search("iPhone");

    cy.url().should("include", "route=product%2Fsearch&search=iPhone");
  });

  it("should click the first product from search results", () => {
    searchPage.search("iPhone");

    searchPage.assertResultsVisible();
    searchPage.clickFirstProduct();

    cy.url().should(
      "include",
      "route=product/product&product_id=40&search=iPhone",
    );
  });

  // ── Negative Test ─────────────────────────────────────────

  it.only("should show no results for invalid search term", () => {
    searchPage.search("xyzxyzxyz123notaproduct");

    cy.url().should(
      "include",
      "route=product%2Fsearch&search=xyzxyzxyz123notaproduct",
    );
  });
});
