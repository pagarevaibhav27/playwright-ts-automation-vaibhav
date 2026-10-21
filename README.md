# Playwright TypeScript Automation

[![Playwright Tests](https://github.com/pagarevaibhav27/playwright-ts-automation-vaibhav/actions/workflows/playwright.yml/badge.svg)](https://github.com/pagarevaibhav27/playwright-ts-automation-vaibhav/actions/workflows/playwright.yml)

End-to-end UI test automation for the [SauceDemo](https://www.saucedemo.com) web store, built with **Playwright** and **TypeScript** using the **Page Object Model (POM)**.

Built by Vaibhav Pagare, Sr. QA engineer with 11 years of experience in API and integration testing, as part of moving from Postman and Selenium into modern Playwright automation.

## What's covered

| Spec file | Scenarios |
|---|---|
| `tests/HappyPath.spec.ts` | Serial end-to-end purchase flow: login, add backpack to cart, remove it and continue shopping, add again, checkout, fill the form, finish the order |
| `tests/InvalidLogin.spec.ts` | Login with a wrong password shows the expected error message |

## Tech stack

- Playwright Test with TypeScript
- Page Object Model for maintainable locators and actions
- `data-test` attribute locators for stable element selection
- Cross-browser runs: Chromium, Firefox and WebKit
- GitHub Actions CI with the HTML report uploaded as an artifact

## Project structure

```
.
├── .github/workflows/playwright.yml   # CI pipeline
├── pages/                             # Page objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── Checkoutform.ts
│   └── CheckoutOverview.ts
├── tests/                             # Test specs
│   ├── HappyPath.spec.ts
│   └── InvalidLogin.spec.ts
└── playwright.config.ts               # Base URL, browsers, reporter, retries
```

## Getting started

Prerequisites: Node.js 18 or later.

```bash
# install dependencies
npm ci

# install the Playwright browsers
npx playwright install

# run all tests (headless, all browsers)
npx playwright test

# run in a visible browser, Chromium only
npx playwright test --project=chromium --headed

# run a single spec
npx playwright test tests/InvalidLogin.spec.ts

# open the HTML report
npx playwright show-report
```

## Design notes

- **Page Object Model:** each page class holds its locators and actions, and the specs only contain test steps and assertions.
- **Serial happy path:** `HappyPath.spec.ts` runs in `serial` mode and shares one browser page, so the steps run in order as a single purchase journey. Other specs run independently and in parallel.
- **CI:** every push and pull request to `main` runs the full suite on GitHub Actions. Retries are enabled on CI only, and traces are captured on the first retry.
- **Test data:** the credentials used are the public demo accounts published on SauceDemo.

## Roadmap

- [ ] Reusable login via `storageState` and custom fixtures, so tests start already authenticated
- [ ] API tests with Playwright's `request` against [Restful Booker](https://restful-booker.herokuapp.com)
- [ ] `@smoke` and `@regression` tags
- [ ] More negative scenarios (locked-out user, empty checkout fields)

## Author

**Vaibhav Pagare**, QA Engineer | API Testing | Test Automation
[LinkedIn](https://www.linkedin.com/in/your-profile) · pagarevaibhav@gmail.com