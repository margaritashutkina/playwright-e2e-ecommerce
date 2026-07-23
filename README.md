# ES Watches — E2E Test Suite

Automated end-to-end tests for [ES Watches](https://eswatches.ae), a luxury
watch resale e-commerce site I designed and built.

## Coverage
- Homepage loads with the correct title
- Main navigation through the slide-out menu drawer: Shop All, collection
  submenu (MODELS → Datejust), and Contact
- Collection page renders product cards with name, price and image
- Price format validation — asserts prices match `Dhs. <number>`, so a price
  that fails to load is caught rather than passing as "element exists"
- Product detail dialog opens with its content sections

## Approach
- Selectors target roles and accessible names rather than translated copy or
  styling classes, so tests survive content and design changes
- Explicit waits on element state (`waitFor`, `toBeVisible`) instead of fixed
  sleeps — tests wait for conditions, not arbitrary durations
- Runs across Chromium, Firefox and WebKit

## Notes on the test environment
Tests run against the **live production storefront** — there is no staging
environment. GitHub-hosted runners share IP ranges that Shopify's bot
protection rate-limits, so CI runs can fail on page load with Shopify's
"There was a problem loading this website" page even when the full suite
passes locally. Worker count is capped to reduce this. Local runs are the
source of truth; a staging or preview environment would be the proper fix.

## Tech
Playwright · TypeScript · GitHub Actions

## Run locally
```
npm install
npx playwright install
npx playwright test
npx playwright show-report
```
