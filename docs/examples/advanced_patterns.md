# Advanced Patterns

## 1. Environment-specific runs

Use script wrapper to target environments:

```bash
npm run test:dev
npm run test:test
npm run test:local
```

## 2. Shared API client abstraction

Keep token/auth logic in `FuelClient` and keep tests focused on assertions.

## 3. Stable page objects

Prefer semantic/stable locators and expose intent-based methods:
- `open()`
- `assertLoaded()`
- `assertCoreElementsVisible()`
- `searchForService()`

## 4. CI report strategy

- `list` for logs
- `html` for artifact browsing
- `ctrf` for actions summary/reporting integrations

## 5. Scaling pattern

As suite grows:
- add more page objects by domain
- split API clients by service
- separate smoke/regression/full workflows
- introduce retry policy per project in Playwright config

