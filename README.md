# 🧪 E-Commerce Automation (Cypress)

## 📌 Project Overview
This project contains End-to-End (E2E) automation tests for an e-commerce application using Cypress.

### 🔄 Automated Flow:
- Login
- Search Product
- Add to Cart
- Proceed to Checkout (until payment page)

---

## ⚙️ Requirements

Make sure the following are installed:

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

Verify installation:
```bash
node -v
npm -v
```

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/susank00/ecommerce-Automation.git
cd ecommerce-automation
npm install
```

---

## ▶️ Running Tests

### ✅ 1. Run All Tests (Headless Mode)

Runs all test files:

```bash
npx cypress run
```

---

### ✅ 2. Run Specific Test File

Run only the checkout flow:

```bash
npx cypress run --spec "cypress/e2e/Features/flows/e2e-checkout-flow.cy.js"
```

👉 You can change the path to run any specific test.

---

### ✅ 3. Run Tests in UI Mode (Interactive)

Open Cypress Test Runner:

```bash
npx cypress open
```

Steps:
- Select E2E Testing
- Choose browser
- Click any test file to run

---


## 📁 Project Structure

```
cypress/
│
├── e2e/
│   └── Features/
│       └── flows/
│           └── e2e-checkout-flow.cy.js   # Main test file
│
├── pages/        # Page Object Model (POM)
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── fixtures/     # Test data
├── support/      # Custom commands
│
├── screenshots/  # Auto screenshots on failure
├── videos/       # Test execution recordings
```

---

## 📸 Screenshots & Videos

Cypress automatically captures:

- Screenshots → on test failure  
- Videos → during test runs  

Locations:

```
cypress/screenshots/
cypress/videos/
```

---

## 🧱 Framework Features

- Page Object Model (POM)
- Reusable test components
- Assertions for validation
- Clean and scalable structure
- Automatic screenshots on failure
- Video recording for debugging

---

## 🧠 Notes

- Use valid login credentials
- Use UI mode (cypress open) for debugging
- Use headless mode (cypress run) for final execution
- Check screenshots/videos if tests fail

---

##  Quick Run (Most Important)

```bash
npx cypress run --spec "cypress/e2e/Features/flows/e2e-checkout-flow.cy.js"
```
