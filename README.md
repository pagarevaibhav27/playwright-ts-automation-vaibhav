# Playwright TypeScript Automation

[![Playwright Tests](https://github.com/pagarevaibhav27/playwright-ts-automation-vaibhav/actions/workflows/playwright.yml/badge.svg)](https://github.com/pagarevaibhav27/playwright-ts-automation-vaibhav/actions/workflows/playwright.yml)

UI and API test automation built with **Playwright** and **TypeScript**: end-to-end tests for the [SauceDemo](https://www.saucedemo.com) web store using the **Page Object Model (POM)**, plus API tests for [Restful Booker](https://restful-booker.herokuapp.com).

A portfolio project by Vaibhav Pagare, Sr. QA engineer with 11 years of experience in API and integration testing, showcasing UI and API test automation with Playwright and TypeScript.

## What's covered

| Spec file | Scenarios |
|---|---|
| `tests/ui/HappyPath.spec.ts` | Serial end-to-end purchase flow: login, add backpack to cart, remove it and continue shopping, add again, checkout, fill the form, finish the order |
| `tests/ui/InvalidLogin.spec.ts` | Login with a wrong password shows the expected error message |
| `tests/ui/ReuseLogin.spec.ts` | Starts already logged in using a saved session, then adds the backpack to the cart |
| `tests/api/APITesting.spec.ts` | Restful Booker API chain: get auth token, create a booking, fetch it and verify its fields, update it, delete it and confirm a 404 afterwards, and verify a delete with an invalid token returns 403 |
| `tests/auth.setup.ts` | Setup project that logs in once and saves the session for the UI tests that need it |

## Tech stack

- Playwright Test with TypeScript
- Page Object Model for maintainable locators and actions
- `data-test` attribute locators for stable element selection
- Playwright `request` fixture for API testing
- `storageState` to log in once and reuse the session
- Separate UI and API projects, with UI tests running on Chromium, Firefox and WebKit
- Test tags (`@smoke`, `@sanity`) to run subsets
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
├── tests/
│   ├── auth.setup.ts                  # Logs in once, saves the session
│   ├── ui/                            # UI specs
│   │   ├── HappyPath.spec.ts
│   │   ├── InvalidLogin.spec.ts
│   │   └── ReuseLogin.spec.ts
│   └── api/                           # API specs
│       └── APITesting.spec.ts
└── playwright.config.ts               # Base URL, projects, reporter, retries
```

## Projects

| Project | What it runs |
|---|---|
| `setup` | `auth.setup.ts`: logs in once and saves the session |
| `ui-chromium`, `ui-firefox`, `ui-webkit` | UI specs from `tests/ui`, after `setup` |
| `api` | API specs from `tests/api`, with no browser and no login |

## Getting started

Prerequisites: Node.js 18 or later.

```bash
# install dependencies
npm ci

# install the Playwright browsers
npx playwright install

# run everything
npx playwright test

# run all UI tests in every browser
npx playwright test --project="ui-*"

# run UI tests in one visible browser
npx playwright test --project=ui-chromium --headed

# run the API tests only
npx playwright test --project=api

# run tagged subsets
npx playwright test --grep "@smoke"
npx playwright test --grep "@sanity"

# open the HTML report
npx playwright show-report
```

## Design notes

- **Page Object Model:** each page class holds its locators and actions, and the specs only contain test steps and assertions.
- **Saved login:** a `setup` project logs in once and writes the session to `playwright/.auth/user.json` (git-ignored). The UI projects depend on it, so tests that need a logged-in start load the session instead of repeating the login. Tests that must start logged out (the login tests) opt out with an empty `storageState`.
- **Separate UI and API projects:** the API project has no browser and no dependency on the login setup, so it runs once and independently of the SauceDemo site.
- **Serial flows:** `HappyPath.spec.ts` and `APITesting.spec.ts` run in `serial` mode because each step depends on the previous one. The API tests share the auth token and booking id through variables declared at the top of the file.
- **Tags:** tests carry `@smoke` and `@sanity` tags. A tag only labels a test, and `--grep` filters on it.
- **CI:** every push and pull request to `main` runs the full suite on GitHub Actions. Retries are enabled on CI only, and traces are captured on the first retry.
- **Test data:** the credentials used are the public demo accounts published by SauceDemo and Restful Booker.

## Roadmap

- [x] Reusable login via `storageState`
- [x] API tests with Playwright's `request` against [Restful Booker](https://restful-booker.herokuapp.com)
- [x] Separate UI and API projects
- [x] Test tags (`@smoke`, `@sanity`) to run subsets
- [ ] More negative scenarios (locked-out user, empty checkout fields)

## Author

**Vaibhav Pagare**, QA Engineer | API Testing | Test Automation
[LinkedIn](https://www.linkedin.com/in/your-profile) · pagarevaibhav@gmail.com