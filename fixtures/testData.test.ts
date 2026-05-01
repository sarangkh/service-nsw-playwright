export const testEnvTestData = {
  ui: {
    validSearchTerm: 'driver licence renewal',
    negativePath: '/this-page-should-not-exist-xyz',
  },
  apiEndpoints: {
    productCategory: {
      path: '/ProductCategory',
      method: 'GET',
      expectedStatus: 200,
    },
    productCategoryWithParams: {
      path: '/ProductCategory',
      method: 'GET',
      params: { offset: '0', limit: '10' },
      expectedStatus: 200,
    },
  },
};
