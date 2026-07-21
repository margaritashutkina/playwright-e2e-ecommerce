# ES Watches — E2E Test Suite

Automated end-to-end tests for [ES Watches](https://eswatches.ae), a luxury
watch resale e-commerce site I designed and built.

## Test strategy
Coverage focuses on critical user flows:
- Homepage loads with product catalog visible
- Navigation and catalog filtering
- Product detail pages (price, photos, details)
- Form validation (empty and invalid input)
- Mobile viewport behavior

Selectors target stable `data-testid` attributes rather than text,
so tests survive copy and styling changes.

## Tech
Playwright · TypeScript · GitHub Actions (tests run on every push)

## Run locally
```
npm install
npx playwright install
npx playwright test
npx playwright show-report
```
