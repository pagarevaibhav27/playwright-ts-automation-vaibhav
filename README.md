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
| `tests/ui/APIMocking.spec.ts` | Network mocking with `page.route`: intercepts the DemoQA books API call, returns a stored JSON response from `tests/api/test-data/BookMockBody.json`, and asserts the mocked book appears on the page |
| `tests/ui/FramesAndPopups.spec.ts` | Browser handling on the-internet.herokuapp.com: nested iframes with `frameLocator`, a new browser window with `waitForEvent('popup')`, and JavaScript alert, confirm and prompt dialogs (accept, dismiss and typed input) |
| `tests/ui/DataDrivenUITest.spec.ts` | Data-driven login tests: reads users from `tests/ui/test-data-ui/testdataui.json` and creates one test per record. Each record has an `expected` outcome (success lands on the inventory page, failure shows an error) and a `run` flag to switch rows on or off |
| `tests/ui/VisualTest.spec.ts` | Visual comparison with `toHaveScreenshot()`: compares the SauceDemo inventory page and the books page against committed baseline images (Chromium, run locally) |
| `tests/api/APITesting.spec.ts` | Restful Booker API chain: get auth token, create a booking, fetch it and verify its fields, update it, delete it and confirm a 404 afterwards, and verify a delete with an invalid token returns 403 |
| `tests/api/HealthCheck.spec.ts` | Health check on Restful Booker `GET /ping`: repeatedly calls the endpoint for 60 seconds and asserts a 201 status and a response time under a set threshold on every call |
| `tests/api/DataDrivenAPITests.spec.ts` | Data-driven POST tests: reads several booking records from `tests/api/test-data/booking.json`, creates one test per record, and asserts the response matches the data sent |
| `tests/auth.setup.ts` | Setup project that logs in once and saves the session for the UI tests that need it |

## Tech stack

- Playwright Test with TypeScript
- Page Object Model for maintainable locators and actions
- `data-test` attribute locators for stable element selection
- Playwright `request` fixture for API testing
- Data-driven UI and API tests fed from JSON files
- Network mocking with `page.route` and stored JSON responses
- Visual comparison tests with baseline screenshots
- Handling of iframes, popups and JavaScript dialogs
- Screenshots, videos and traces captured for failed tests
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
│   ├── CheckoutForm.ts
│   └── CheckoutOverview.ts
├── tests/
│   ├── auth.setup.ts                  # Logs in once, saves the session
│   ├── ui/                            # UI specs
│   │   ├── APIMocking.spec.ts
│   │   ├── DataDrivenUITest.spec.ts
│   │   ├── FramesAndPopups.spec.ts
│   │   ├── HappyPath.spec.ts
│   │   ├── InvalidLogin.spec.ts
│   │   ├── ReuseLogin.spec.ts
│   │   ├── VisualTest.spec.ts
│   │   ├── VisualTest.spec.ts-snapshots/   # Baseline images
│   │   └── test-data-ui/
│   │       └── testdataui.json         # Users for the data-driven login tests
│   └── api/                           # API specs
│       ├── APITesting.spec.ts
│       ├── DataDrivenAPITests.spec.ts
│       ├── HealthCheck.spec.ts
│       └── test-data/
│           ├── booking.json       # Records for the data-driven tests
│           └── BookMockBody.json  # Mocked response used by the mocking test
├── tsconfig.json                      # TypeScript settings
└── playwright.config.ts               # Base URL, projects, reporter, retries, capture settings
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

# run visual comparison tests (locally)
npx playwright test --grep "@visual" --project=ui-chromium

# run tagged subsets
npx playwright test --grep "@smoke"
npx playwright test --grep "@sanity"

# open the HTML report
npx playwright show-report
```

Failed tests keep a screenshot, a video and a trace. Open them from the HTML report's Attachments section, or from the `test-results` folder.

## Design notes

- **Page Object Model:** each page class holds its locators and actions, and the specs only contain test steps and assertions.
- **Saved login:** a `setup` project logs in once and writes the session to `playwright/.auth/user.json` (git-ignored). The UI projects depend on it, so tests that need a logged-in start load the session instead of repeating the login. Tests that must start logged out (the login tests) opt out with an empty `storageState`.
- **Separate UI and API projects:** the API project has no browser and no dependency on the login setup, so it runs once and independently of the SauceDemo site.
- **Serial flows:** `HappyPath.spec.ts` and `APITesting.spec.ts` run in `serial` mode because each step depends on the previous one. The API tests share the auth token and booking id through variables declared at the top of the file.
- **Health check:** a separate API spec polls `/ping` for 60 seconds and fails on any non-201 status or any response slower than the threshold, a basic availability and response-time check.
- **Data-driven UI tests:** each user record in `testdataui.json` carries its credentials, the expected outcome and a `run` flag. The spec loops over the records and creates one named test per enabled row, so adding a scenario or switching one off is a data change only.
- **Data-driven API tests:** test data lives in a JSON file, and the spec loops over the records so each one becomes its own test, named after its data. Adding a scenario is one new record and no code change.
- **Network mocking:** the mocking test registers `page.route` before navigating, so the page receives a controlled response. This makes the test independent of the live service and lets it create cases a real server can't give on demand. The real API tests still run against Restful Booker.
- **Failure evidence:** the config records a screenshot and a video only for failed tests (`retain-on-failure`), and a trace on the first retry, which keeps runs light and still gives full evidence for debugging.
- **Frames, popups and dialogs:** frame content is reached through `frameLocator`, which auto-waits like any other locator. For a new window, the test starts waiting for the `popup` event before the click and collects the page afterwards. Dialogs are handled by registering a `dialog` listener before the click, with `accept`, `dismiss` or `accept('text')` depending on the dialog type.
- **Visual comparison:** `toHaveScreenshot()` saves a baseline image on the first run and compares against it afterwards. Baselines are created per operating system, so these tests are tagged `@visual` and run locally; refresh them after an intended UI change with `--update-snapshots`.
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
[LinkedIn](https://www.linkedin.com/in/vaibhav-pagare-41b571b9/) · pagarevaibhav@gmail.com