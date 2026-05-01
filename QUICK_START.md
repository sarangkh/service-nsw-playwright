# Quick Start

## 1) Install

```bash
npm install
npx playwright install chromium
```

## 2) Configure environment

Pick one environment file:
- `.env.dev`
- `.env.test`
- `.env.local`

For secrets, prefer local overrides:
- `.env.dev.local`
- `.env.test.local`
- `.env.local.local`

For Fuel API tests, set one of:

```env
FUEL_API_AUTH_HEADER=Basic <base64(api_key:api_secret)>
```

or

```env
FUEL_API_KEY=<key>
FUEL_API_SECRET=<secret>
```

## 3) Run tests

```bash
npm run test:dev
npm run test:test
npm run test:local
```

Other options:

```bash
npm test
npm run test:headed
npm run test:debug
npm run report
```

## 4) CI setup

In GitHub repository secrets, add:
- `FUEL_API_AUTH_HEADER` (recommended)
- or `FUEL_API_KEY` and `FUEL_API_SECRET`

Workflow file: `.github/workflows/playwright-tests.yml`

