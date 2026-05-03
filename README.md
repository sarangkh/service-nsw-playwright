# Service NSW Playwright Test Framework

Playwright + TypeScript automation framework for public Service NSW UI checks and Fuel API validation.

This repository is intentionally scoped to:
- 3 UI scenarios (public website)
- 2 Fuel API scenarios (OAuth + LOVs)
- Environment-based execution (`dev`, `test`, `local`)

## Getting started (run everything locally)

| Step | Action |
| --- | --- |
| 1 | Clone the repo and `cd` into the project root. |
| 2 | Install packages: `npm ci` (same lockfile as CI) or `npm install`. |
| 3 | Install Chromium for Playwright: `npx playwright install chromium`. |
| 4 | Add **Fuel API** credentials in a gitignored env file (see [Secrets and environment files](#secrets-and-environment-files)). Without them, Fuel API tests **fail** by design. |
| 5 | (Optional) `npm run lint` — same checks as CI. |
| 6 | Run tests: `npm run test:dev`, `npm run test:test`, or `npm run test:local`. These use `scripts/run-tests.js`, which sets `TEST_ENV` and runs Playwright **headless**. |

**Other commands**

- `npm run test:headed` — browser visible (`playwright test --headed`; uses default env resolution from `config.ts` if `TEST_ENV` is unset).
- `npm run test:debug` — Playwright inspector.
- `npm run report` — open the last HTML report under `playwright-report/` (ignored by git).

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

## Project structure and files

Everything below is **committed on purpose** except generated folders (`node_modules/`, `playwright-report/`, `test-results/`, `ctrf/`), which are recreated when you install or run tests.

```text
service-nsw-playwright/
├── api/
│   └── fuelClient.ts              # Fuel API client (OAuth + LOVs)
├── docs/                          # Extra Markdown guides (see end of README)
├── fixtures/
│   ├── testData.ts                # Picks test data by config.environment
│   ├── testData.dev.ts
│   └── testData.test.ts
├── pages/
│   ├── HomePage.ts
│   └── SearchResultsPage.ts       # Locators + actions only (assertions live in specs)
├── scripts/
│   └── run-tests.js               # Sets TEST_ENV, then runs Playwright CLI
├── tests/
│   ├── api-tests/
│   │   └── fuel-api.spec.ts
│   └── ui-tests/
│       └── homepage.spec.ts
├── .github/workflows/
│   └── playwright-tests.yml
├── .env.example                   # Template only — safe to commit (no real secrets)
├── config.ts                      # Loads dotenv + exports `config`
├── playwright.config.ts           # Playwright runner, reporters, baseURL
├── tsconfig.json                  # TypeScript compiler options
├── eslint.config.mjs              # ESLint + typescript-eslint + Playwright plugin
├── package.json / package-lock.json
└── README.md
```

### Prerequisites

- **Node.js 20+** and **npm** (CI uses Node 20).

## Secrets and environment files

**Never commit real API keys or Basic auth strings.** Use gitignored files (see `.gitignore`: `.env`, `.env.*`, `.env.local`, `.env.*.local`, with `!.env.example` kept in the repo).

`config.ts` resolves the active environment from `TEST_ENV` or `ENVIRONMENT` (`dev` \| `test` \| `local`, default `dev`), then loads dotenv in this **order** (later files can override earlier keys):

1. `.env`
2. `.env.local`
3. `.env.<environment>` (e.g. `.env.test` when `TEST_ENV=test`)
4. `.env.<environment>.local` (e.g. `.env.test.local` — **recommended place for secrets**)

**Fuel API (required for passing API tests)**

Provide either:

- `FUEL_API_AUTH_HEADER=Basic <base64(api_key:api_secret)>`, **or**
- `FUEL_API_KEY` and `FUEL_API_SECRET`

Typical non-secret defaults (URLs/paths) match `.env.example`. Copy that file to something like `.env.test.local`, fill in Fuel fields, then run `npm run test:test` so `TEST_ENV=test` matches your file names.

**GitHub Actions** does not use repo env files for secrets. It injects [repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) into the job environment (see next section). Non-secret URLs are set as plain `env:` entries in the workflow file.

## How to execute tests locally

```bash
npm run test:dev      # TEST_ENV=dev (via run-tests.js)
npm run test:test     # TEST_ENV=test
npm run test:local    # TEST_ENV=local
npm test              # same as test:dev
npm run test:headed   # visible browser; set TEST_ENV in your shell if needed
npm run test:debug
npm run report        # open HTML report after a run
```

## Linting

Static analysis keeps tests aligned with common TypeScript and Playwright guidance.

### Run locally

```bash
npm run lint
```

This runs [ESLint](https://eslint.org/) over the TypeScript sources (excluding generated folders and `scripts/`, which is plain Node).

### What is configured

| Piece | Role |
| --- | --- |
| `eslint.config.mjs` | ESLint 9 **flat config** at the repo root |
| `@eslint/js` | Core JavaScript recommended rules |
| `typescript-eslint` | TypeScript-aware linting (`recommended`) |
| `eslint-plugin-playwright` | [`flat/recommended`](https://github.com/mskelton/eslint-plugin-playwright) applied to `tests/**/*.ts` |

Playwright rules encourage web-first assertions, valid `test`/`expect` usage, and other checks described in the [plugin rule list](https://github.com/mskelton/eslint-plugin-playwright#rules). They complement the [Playwright best-practices](https://playwright.dev/docs/best-practices) docs.

**API tests** (`tests/api-tests/`): `playwright/no-conditional-in-test` and `playwright/no-conditional-expect` are turned off there so specs can branch on HTTP status (for example 200 vs 401/403) without fighting the linter.

### CI

The GitHub Actions workflow runs `npm run lint` before installing browsers and running Playwright, so broken or discouraged patterns fail the pipeline early.

## GitHub Actions (CI run)

Workflow: [`.github/workflows/playwright-tests.yml`](.github/workflows/playwright-tests.yml)

**When it runs**

- **Push** and **pull_request** to `main` or `develop`
- **workflow_dispatch** (manual “Run workflow” in the Actions tab)

**What the job does (in order)**

1. Checkout code  
2. **setup-node** (Node 20, npm cache from `package-lock.json`)  
3. `npm ci` — install dependencies exactly as locked  
4. `npm run lint` — ESLint; failures stop the job before browsers  
5. `npx playwright install --with-deps chromium`  
6. `npx playwright test` — full suite (UI hits live Service NSW; API hits Fuel API with secrets)  
7. **Publish CTRF test report** — `ctrf-io/github-test-reporter@v1` reads `./ctrf/*.json` (generated under `ctrf/` during the run; folder is gitignored locally)  
8. **Upload artifact** — `playwright-report/` ZIP for 7 days  

**Environment variables in CI**

- **Plain `env:` in the workflow** (not secret): `TEST_ENV`, `ENVIRONMENT`, `UI_BASE_URL`, `UI_SEARCH_PATH`, Fuel base URLs/paths — aligned with `.env.example` / committed `.env.<environment>` files.
- **Secrets** (configure under **Repository → Settings → Secrets and variables → Actions**):
  - `FUEL_API_KEY` (optional if you only use the header)
  - `FUEL_API_SECRET` (optional if you only use the header)
  - `FUEL_API_AUTH_HEADER` (recommended if you use a single Basic header)

The workflow maps them to `FUEL_API_*` env vars the same way you would locally.

**`GITHUB_TOKEN`**

The **Publish CTRF test report** step sets `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`. GitHub creates this token automatically for each job; you do **not** add `GITHUB_TOKEN` under repository secrets.

**Viewing results**

- **Actions** tab → select the workflow run → job logs; check steps for lint/test failures.  
- Download the **playwright-report** artifact for the HTML report.  
- CTRF step adds check/run annotations when the action succeeds.

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

Markdown guides live under **`docs/`**:

| File | Contents |
| --- | --- |
| `docs/quick_start.md` | Fast setup and run reference |
| `docs/resources.md` | Useful links and references |
| `docs/summary.md` | Concise framework summary |
| `docs/architecture.md` | Architecture and execution flow |
| `docs/troubleshooting.md` | Common issues and fixes |
| `docs/examples/basic_test.md` | Starter examples |
| `docs/examples/advanced_patterns.md` | Extensibility patterns |

Also useful: `.github/workflows/playwright-tests.yml` (CI), `.env.example` (configuration template).

### How to read these on the web

1. **GitHub (no extra setup)**  
   After you push this repository to GitHub, open any file under `docs/` in the browser. GitHub renders Markdown automatically. The URL shape is:  
   `https://github.com/<your-org>/<your-repo>/blob/<branch>/docs/quick_start.md`  
   (replace org, repo, and branch; for the default branch, `main` is typical.)

2. **In the editor (local preview)**  
   In VS Code or Cursor, open a `.md` file and use **Markdown: Open Preview** (command palette) or the preview icon so you see formatted output without leaving the project.

3. **Optional: GitHub Pages**  
   If you want a dedicated site (table of contents, theme, search), you can enable [GitHub Pages](https://docs.github.com/pages) and point it at the `docs/` folder or a static site generator; that is not configured in this repo by default.

## Current Scope Summary

- UI tests: 3
- API tests: 2 (Fuel API)
- Execution model: environment-driven (`dev`, `test`, `local`)

