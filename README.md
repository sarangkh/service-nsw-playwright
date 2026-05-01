# Service NSW Playwright Test Framework

Playwright + TypeScript automation framework for public Service NSW UI checks and Fuel API validation.

This repository is intentionally scoped to:
- 3 UI scenarios (public website)
- 2 Fuel API scenarios (OAuth + LOVs)
- Environment-based execution (`dev`, `test`, `local`)

## Overall Architecture

The framework uses a layered design:

1. **Test Layer**
   - UI spec: `tests/ui-tests/homepage.spec.ts`
   - API spec: `tests/api-tests/fuel-api.spec.ts`

2. **Abstraction Layer**
   - UI page objects:
     - `pages/HomePage.ts`
     - `pages/SearchResultsPage.ts`
   - API client:
     - `api/fuelClient.ts`

3. **Configuration Layer**
   - Central config: `config.ts`
   - Environment files: `.env.dev`, `.env.test`, `.env.local`
   - Optional secret overrides: `.env.<env>.local`

4. **Execution Layer**
   - Playwright runner + config: `playwright.config.ts`
   - Script wrapper for env selection: `scripts/run-tests.js`
   - CI workflow: `.github/workflows/playwright-tests.yml`

## Design Decisions

- **Page Object Model for UI**  
  Keeps selectors and page behavior centralized and reusable.

- **Dedicated API client for Fuel API**  
  Token generation and endpoint calls are centralized in `FuelClient` to keep test files assertion-focused.

- **Environment-driven configuration**  
  `TEST_ENV` decides which env file is loaded, enabling `dev/test/local` without code changes.

- **Small core suite by design**  
  Fast feedback loop with business-relevant checks before expanding coverage.

## Technology Choices and Justification

- **Playwright** (`@playwright/test`)  
  Single framework for browser + API tests, stable CI support, strong reporting.

- **TypeScript**  
  Type safety and better maintainability for a growing test codebase.

- **dotenv**  
  Simple and standard secret/config loading per environment.

- **GitHub Actions**  
  Native GitHub integration for CI and secret management.

## Project Structure

```text
service-nsw-playwright/
├── api/
│   └── fuelClient.ts
├── pages/
│   ├── HomePage.ts
│   └── SearchResultsPage.ts
├── scripts/
│   └── run-tests.js
├── tests/
│   ├── api-tests/
│   │   └── fuel-api.spec.ts
│   └── ui-tests/
│       └── homepage.spec.ts
├── .github/workflows/
│   └── playwright-tests.yml
├── config.ts
├── playwright.config.ts
├── package.json
└── .env.example / .env.dev / .env.test / .env.local
```

## Setup Instructions

### 1) Prerequisites

- Node.js 20+ recommended
- npm

### 2) Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3) Environment configuration

Create one of:
- `.env.dev.local`
- `.env.test.local`
- `.env.local.local` (if using `TEST_ENV=local`) or place secrets directly in `.env.local`

The loader reads:
1. `.env`
2. `.env.local`
3. `.env.<env>`
4. `.env.<env>.local`

### 4) Required API secrets (Fuel API)

Use either:

- `FUEL_API_AUTH_HEADER=Basic <base64(api_key:api_secret)>`

or

- `FUEL_API_KEY=<key>`
- `FUEL_API_SECRET=<secret>`

Recommended keys:

```env
FUEL_API_BASE_URL=https://api.onegov.nsw.gov.au
FUEL_API_OAUTH_PATH=/oauth/client_credential/accesstoken?grant_type=client_credentials
FUEL_API_LOVS_PATH=/FuelCheckRefData/v1/fuel/lovs
FUEL_API_AUTH_HEADER=Basic <...>
```

## How To Execute Tests Locally

### Environment-based runs

```bash
npm run test:dev
npm run test:test
npm run test:local
```

### Other useful runs

```bash
npm test                # defaults to dev
npm run test:headed     # headed mode via Playwright directly
npm run test:debug      # Playwright debug mode
npm run report          # open HTML report
```

## GitHub Actions and Secrets

Workflow file: `.github/workflows/playwright-tests.yml`

The workflow expects Fuel secrets from GitHub Secrets:

- `FUEL_API_KEY` (optional if auth header provided)
- `FUEL_API_SECRET` (optional if auth header provided)
- `FUEL_API_AUTH_HEADER` (recommended)

Add these in:
- **GitHub Repository -> Settings -> Secrets and variables -> Actions**

No secrets should be committed to repository files.

## Assumptions Made

- Public Service NSW website is reachable from test runner network.
- Fuel API credentials are valid and authorized for configured endpoints.
- DNS/proxy/firewall policies allow access to:
  - `https://www.service.nsw.gov.au`
  - `https://api.onegov.nsw.gov.au`
- Test runtime can download/install Playwright Chromium in CI.

## Trade-offs Considered

- **Small suite vs broad coverage**  
  Chosen: small, stable suite for quick feedback.  
  Trade-off: less functional depth than a full regression pack.

- **Live endpoint validation vs deterministic mocks**  
  Chosen: live endpoint checks for confidence in real integrations.  
  Trade-off: susceptible to external downtime/rate limits.

- **Single-browser CI (Chromium) vs multi-browser matrix**  
  Chosen: Chromium-only for faster pipeline.  
  Trade-off: reduced cross-browser confidence.

## How This Could Scale for Enterprise Use

1. **Test taxonomy expansion**
   - Add smoke/regression/full tags
   - Add feature-based folders and ownership

2. **Multi-project Playwright config**
   - Separate UI/API projects with custom retries/timeouts/reporters

3. **Environment promotion model**
   - Dedicated `dev`, `sit`, `uat`, `prod-like` configs
   - Protected secrets per environment in CI

4. **Reusable internal libraries**
   - Shared package for API clients, auth helpers, and common assertions

5. **Quality gates**
   - PR-required smoke
   - Nightly regression
   - Flake detection and quarantine pipeline

6. **Observability**
   - Push JUnit/trace artifacts to centralized dashboard
   - Track trend metrics (pass rate, duration, flaky tests)

## Additional Documentation

- `QUICK_START.md` - fast setup/run reference
- `.github/workflows/playwright-tests.yml` - CI implementation details
- `.env.example` - configuration template

## Current Scope Summary

- UI tests: 3
- API tests: 2 (Fuel API)
- Execution model: environment-driven (`dev`, `test`, `local`)

