import { config } from '../config';
import { devTestData } from './testData.dev';
import { testEnvTestData } from './testData.test';

const dataByEnvironment = {
  dev: devTestData,
  test: testEnvTestData,
  local: devTestData,
};

export const testData = dataByEnvironment[config.environment];
