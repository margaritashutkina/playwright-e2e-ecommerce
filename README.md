![Playwright Tests](https://github.com/margaritashutkina/playwright-e2e-ecommerce/actions/workflows/playwright.yml/badge.svg)

# Playwright E2E Test Suite — Live E-Commerce Storefront

Automated end-to-end tests for a live luxury-watch resale storefront I
designed and built.

## Coverage
- Homepage loads with the correct title
- Main navigation through the slide-out menu drawer: Shop All, collection
  submenu (MODELS → Datejust), and Contact
- Collection page renders product cards with name, price and image
- Price format validation — asserts prices match `Dhs. <number>`, so a
  price that fails to load is caught rather than passing as
  "element exists"
- Product page navigation — clicking a card opens its own shareable
  product page, which loads directly from its URL

## Approach
- Selectors target roles and accessible names rather than translated copy
  or styling classes, so tests survive content and design changes
- Explicit waits on element state (`waitFor`, `toBeVisible`) instead of
  fixed sleeps — tests wait for conditions, not arbitrary durations
- Runs across Chromium, Firefox and WebKit

## Test environment
The full E2E suite targets the live production storefront — there is no
staging environment. GitHub-hosted runners share IP ranges that the
platform's bot protection rate-limits, so those tests can fail on page
load in CI even when the whole suite passes locally.

To keep the pipeline signal reliable, **CI runs an environment-independent
smoke suite** (`smoke.spec.ts`); the full storefront suite is run locally
and on demand. A dedicated preview/staging environment is the planned
long-term fix that would let the full suite run in CI.

## Tech
Playwright · TypeScript · GitHub Actions