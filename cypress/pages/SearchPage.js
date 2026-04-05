const BasePage = require("./BasePage");

class SearchPage extends BasePage {
  // ── Selectors
  get searchInput() {
    return '#entry_217822 > div input[placeholder="Search For Products"]';
  }
  get searchButton() {
    return '#entry_217822 > div button[type="submit"]';
  }
  get searchResults() {
    return ".product-thumb";
  }
  get secondProduct() {
    return ".product-thumb:nth-child(2) h4 a";
  }
  get noResultsMsg() {
    return "#content p";
  }

  // ── Actions

  enterSearchTerm(term) {
    this.type(this.searchInput, term);
  }

  clickSearch() {
    this.click(this.searchButton);
  }

  search(term) {
    this.enterSearchTerm(term);
    this.clickSearch();
  }

  clickFirstProduct() {
    this.click(this.firstProduct);
  }
  clickSecondProduct() {
    cy.get(".product-thumb h4 a").eq(1).should("be.visible").click();
  }
  // ── Assertions

  assertResultsPageLoaded() {
    cy.url().should("include", "route=product%2Fsearch&search=iPod+Shuffle");
  }

  assertResultsVisible() {
    cy.get(this.searchResults).should("be.visible").and("have.length.above", 0);
  }

  assertNoResults() {
    cy.get(this.noResultsMsg).should(
      "contain.text",
      "There is no product that matches the search criteria",
    );
  }
}

module.exports = SearchPage;
