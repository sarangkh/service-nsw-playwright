# Resources & References

## 📚 Internal Documentation

### Getting Started
- [QUICK_START.md](QUICK_START.md) - 5-minute setup guide
- [README.md](README.md) - Comprehensive documentation
- [FRAMEWORK_DOCUMENTATION.md](FRAMEWORK_DOCUMENTATION.md) - Concise key information
- [SUMMARY.md](SUMMARY.md) - Project summary and status

### Development
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute and write tests
- [src/pages/](src/pages/) - Page Object Models
- [src/tests/](src/tests/) - Test specifications
- [src/api/](src/api/) - API client implementation

---

## 🎯 Common Tasks

### Running Tests
```bash
npm test                # All tests
npm run test:ui         # UI only
npm run test:api        # API only
npm run test:headed     # With browser visible
npm run test:debug      # Debug mode
```

### Viewing Results
```bash
npm run report          # HTML report
cat test-results/junit.xml  # JUnit results
```

### Development
```bash
npm run codegen         # Record interactions
npm install             # Install dependencies
npx playwright install  # Install browsers
```

---

## 🔗 External Resources

### Playwright
- **Official Docs**: https://playwright.dev
- **API Reference**: https://playwright.dev/docs/api/class-playwright
- **Best Practices**: https://playwright.dev/docs/best-practices

### NSW Government
- **NSW Services Portal**: https://www.service.nsw.gov.au
- **API Portal**: https://api.nsw.gov.au
- **ProductCategory Endpoint**: https://api.nsw.gov.au/ProductCategory

### Technologies
- **TypeScript**: https://www.typescriptlang.org
- **Node.js**: https://nodejs.org
- **GitHub Actions**: https://docs.github.com/en/actions
- **Docker**: https://docs.docker.com

---

## 📊 Architecture Resources

### Framework Components
- **Config**: [src/config/index.ts](src/config/index.ts)
- **API Client**: [src/api/client.ts](src/api/client.ts)
- **UI Helpers**: [src/utils/uiHelpers.ts](src/utils/uiHelpers.ts)
- **Test Data**: [src/fixtures/testData.ts](src/fixtures/testData.ts)

### Page Objects
- **HomePage**: [src/pages/HomePage.ts](src/pages/HomePage.ts)
- **SearchResultsPage**: [src/pages/SearchResultsPage.ts](src/pages/SearchResultsPage.ts)
- **ServiceDetailsPage**: [src/pages/ServiceDetailsPage.ts](src/pages/ServiceDetailsPage.ts)

### Test Suites
- **UI Tests**: [src/tests/ui/homepage.ui.spec.ts](src/tests/ui/homepage.ui.spec.ts)
- **API Tests**: [src/tests/api/products.api.spec.ts](src/tests/api/products.api.spec.ts)

### Configuration Files
- **Playwright**: [playwright.config.ts](playwright.config.ts)
- **TypeScript**: [tsconfig.json](tsconfig.json)
- **Package**: [package.json](package.json)
- **Environment**: [.env.example](.env.example)

### CI/CD
- **GitHub Actions**: [.github/workflows/playwright-tests.yml](.github/workflows/playwright-tests.yml)

### Containerization
- **Dockerfile**: [Dockerfile](Dockerfile)
- **Compose**: [docker-compose.yml](docker-compose.yml)

---

## 🆘 Troubleshooting Resources

### Common Issues

| Issue | Solution |
|-------|----------|
| Tests won't run | See [QUICK_START.md](QUICK_START.md#troubleshooting) |
| Setup problems | Check [README.md - Setup](README.md#setup-instructions) |
| Test failures | Review [playwright-report/](playwright-report/) |
| API errors | Check [src/api/client.ts](src/api/client.ts) |
| Selector issues | Run `npm run codegen` |
| Timeout errors | Increase `TIMEOUT_MS` in `.env` |

### Debugging
- [README - Troubleshooting](README.md#troubleshooting)
- [QUICK_START - Troubleshooting](QUICK_START.md#troubleshooting)
- Run with `npm run test:debug`
- Use `npm run codegen` for recording

---

## 📖 Learning Path

### For New Team Members
1. Read [QUICK_START.md](QUICK_START.md)
2. Install and run tests
3. Review [src/pages/](src/pages/) Page Objects
4. Read [CONTRIBUTING.md](CONTRIBUTING.md)
5. Study [README.md](README.md) - Architecture section

### For QA Engineers
1. Understand [FRAMEWORK_DOCUMENTATION.md](FRAMEWORK_DOCUMENTATION.md)
2. Review test scenarios in [src/tests/](src/tests/)
3. Learn to write tests in [CONTRIBUTING.md](CONTRIBUTING.md)
4. Study [README.md](README.md) - Test Scenarios section

### For DevOps/Infrastructure
1. Review [.github/workflows/](\.github/workflows/) CI/CD
2. Understand [Dockerfile](Dockerfile)
3. Study [docker-compose.yml](docker-compose.yml)
4. Read [README.md](README.md) - CI/CD Pipeline section

### For Architects/Leads
1. Read [README.md](README.md) - Architecture & Design
2. Review [SUMMARY.md](SUMMARY.md)
3. Understand scaling in [README.md](README.md) - Enterprise Scalability
4. Study technology choices in [README.md](README.md) - Technology Choices

---

## 🔐 Security Resources

### Secrets Management
- Never commit `.env` files
- Use GitHub Secrets for API keys
- Review [README.md](README.md) - Setup Instructions
- Check [.gitignore](.gitignore)

### API Security
- Test coverage for sensitive data: [src/tests/api/products.api.spec.ts](src/tests/api/products.api.spec.ts) - API-015, API-019
- No hardcoded credentials
- Environment-based config: [src/config/index.ts](src/config/index.ts)

---

## 📈 Performance Resources

### Performance Testing
- See [src/tests/api/products.api.spec.ts](src/tests/api/products.api.spec.ts) - Tests API-016, API-017
- Response time validation
- Concurrent request handling
- Benchmarks in [README.md](README.md) - Performance Benchmarks

### Optimization
- Parallel execution: `npm test` (default)
- Sequential: `npx playwright test --workers=1`
- Docker scaling: `docker-compose up --scale service=5`

---

## 🚀 Deployment Resources

### Local Development
- [QUICK_START.md](QUICK_START.md)
- `npm install && npm test`

### Docker Local
```bash
docker build -t nsw-tests .
docker run nsw-tests
# Or with compose
docker-compose up test-runner
```

### CI/CD (GitHub)
- Push to main/develop triggers [.github/workflows/playwright-tests.yml](.github/workflows/playwright-tests.yml)
- View results in Actions tab

---

## 📋 Test Reference

### UI Test IDs
- **HC-001 to HC-002**: Homepage tests
- **SC-001 to SC-004**: Search tests
- **SD-001 to SD-004**: Service details tests
- **EH-001 to EH-003**: Error handling tests

### API Test IDs
- **API-001 to API-009**: Valid request tests
- **API-010 to API-014**: Negative test cases
- **API-015 to API-019**: Security & performance tests

See [src/tests/](src/tests/) for details.

---

## 🤝 Support

### Documentation Hierarchy
1. **Quick**: [QUICK_START.md](QUICK_START.md) (5 minutes)
2. **Reference**: [FRAMEWORK_DOCUMENTATION.md](FRAMEWORK_DOCUMENTATION.md) (key info)
3. **Complete**: [README.md](README.md) (everything)
4. **Guide**: [CONTRIBUTING.md](CONTRIBUTING.md) (how to contribute)

### Getting Help
- Check relevant documentation above
- Review test files for examples
- Check GitHub Actions logs for CI/CD issues
- Consult Playwright documentation

---

## ✅ Verification Checklist

Before deployment, verify:
- [ ] README.md read and understood
- [ ] All tests passing locally: `npm test`
- [ ] HTML report generated: `npm run report`
- [ ] API key configured (if needed)
- [ ] .env file created from .env.example
- [ ] Dependencies installed: `npm install`
- [ ] Browsers installed: `npx playwright install`
- [ ] CI/CD configured in GitHub Secrets
- [ ] Docker builds successfully: `docker build .`

---

## 📞 Quick Links

| Resource | Link |
|----------|------|
| Main Docs | [README.md](README.md) |
| Quick Setup | [QUICK_START.md](QUICK_START.md) |
| Key Info | [FRAMEWORK_DOCUMENTATION.md](FRAMEWORK_DOCUMENTATION.md) |
| Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Summary | [SUMMARY.md](SUMMARY.md) |
| Playwright | https://playwright.dev |
| NSW Services | https://www.service.nsw.gov.au |
| NSW APIs | https://api.nsw.gov.au |

---

**Last Updated**: May 1, 2026  
**Framework Version**: 1.0.0

For detailed information, always refer to [README.md](README.md).
