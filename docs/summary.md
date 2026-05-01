# Framework Summary

## Scope

- 3 UI tests against public Service NSW website
- 2 Fuel API tests (OAuth token + LOVs endpoint behavior)
- Environment-based execution (`dev`, `test`, `local`)

## Key design choices

- Page Object Model for UI maintainability
- Shared `FuelClient` for API token/auth logic reuse
- Dotenv layered environment loading
- Playwright + TypeScript for one-stack UI/API automation

## CI/CD

- GitHub Actions workflow runs tests on push/PR and workflow dispatch
- CTRF reporting enabled via Playwright reporter and CTRF GitHub action
- Playwright HTML report uploaded as artifact

## Test commands

- `npm run test:dev`
- `npm run test:test`
- `npm run test:local`
- `npm run test:headed`
- `npm run test:debug`

