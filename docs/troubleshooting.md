# Troubleshooting

## `Missing Fuel API auth credentials in env`

Add one of the following in active env/local override file:

- `FUEL_API_AUTH_HEADER=Basic <base64(api_key:api_secret)>`
- `FUEL_API_KEY=<key>` and `FUEL_API_SECRET=<secret>`

## `Dependencies lock file is not found` in GitHub Actions

Ensure `package-lock.json` is committed (required when using `actions/setup-node` with `cache: npm`).

## `Cannot find module scripts/run-tests.js`

Ensure `scripts/run-tests.js` exists and is committed.

## API tests fail locally but pass in another terminal

Likely env mismatch. Confirm active env:

- `npm run test:dev` uses `.env.dev` + `.env.dev.local`
- `npm run test:test` uses `.env.test` + `.env.test.local`
- `npm run test:local` uses `.env.local` + `.env.local.local`

## HTML report missing in CI artifact

Ensure `playwright.config.ts` includes HTML reporter and workflow uploads `playwright-report/`.

