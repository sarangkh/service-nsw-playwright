const { spawnSync } = require('child_process');

const environment = process.argv[2] || 'dev';
const extraArgs = process.argv.slice(3);
const playwrightCli = require.resolve('@playwright/test/cli');

const result = spawnSync(process.execPath, [playwrightCli, 'test', '--headed', ...extraArgs], {
  stdio: 'inherit',
  env: {
    ...process.env,
    TEST_ENV: environment,
  },
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
