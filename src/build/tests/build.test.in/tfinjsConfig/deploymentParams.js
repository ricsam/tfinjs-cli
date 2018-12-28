const deploymentParams = (overrides = {}) => ({
  project: 'pet-shop',
  environment: 'stage',
  version: 'v1',
  ...overrides,
});

export default deploymentParams;
