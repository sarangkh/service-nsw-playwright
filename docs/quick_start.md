# Quick Start

## Install

```bash
npm install
npx playwright install chromium
```

## Configure environment

Use one environment:

- `.env.dev`
- `.env.test`
- `.env.local`

Optional local secrets overrides:

- `.env.dev.local`
- `.env.test.local`
- `.env.local.local`

For Fuel API tests, set either:

- `FUEL_API_AUTH_HEADER=Basic <base64(api_key:api_secret)>`

or:

- `FUEL_API_KEY=<key>`
- `FUEL_API_SECRET=<secret>`

## Run tests

```bash
npm run test:dev
npm run test:test
npm run test:local
```

Other commands:

```bash
npm test
npm run test:headed
npm run test:debug
npm run report
```

