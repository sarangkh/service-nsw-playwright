# Architecture

## Layers

1. **Tests**
   - `tests/ui-tests/homepage.spec.ts`
   - `tests/api-tests/fuel-api.spec.ts`

2. **Abstractions**
   - UI: `pages/HomePage.ts`, `pages/SearchResultsPage.ts`
   - API: `api/fuelClient.ts`

3. **Configuration**
   - `config.ts` (environment + secrets loading)
   - `.env*` files

4. **Execution**
   - `playwright.config.ts`
   - `scripts/run-tests.js`
   - `.github/workflows/playwright-tests.yml`

## Flow

1. Script sets `TEST_ENV` (`dev`/`test`/`local`)
2. `config.ts` loads env files in precedence order
3. Playwright executes UI/API specs
4. Reporters output:
   - console list
   - html report
   - ctrf json
5. GitHub Action publishes CTRF summary and uploads Playwright HTML artifact

