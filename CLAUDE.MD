# CLAUDE.MD - AI Assistant Context

## Project Overview

This is an Appium-based test automation project for the 3Shape application. It provides automated testing capabilities for mobile or web applications using the Appium framework.

## Project Structure

```
appium-test/
├── README.md          # Project documentation
├── .gitignore         # Git ignore patterns
└── CLAUDE.MD          # AI assistant context (this file)
```

## Technology Stack

- **Testing Framework**: Appium
- **Target Application**: 3Shape

## Development Guidelines

### Code Style
- Follow consistent naming conventions for test cases
- Use descriptive names for test methods and variables
- Keep tests independent and atomic
- Implement proper wait strategies (avoid hard sleeps)

### Test Organization
- Group related tests together
- Use page object model pattern for UI interactions
- Separate test data from test logic
- Implement reusable helper functions

### Best Practices
- Write clear and maintainable test code
- Add meaningful assertions
- Handle test cleanup properly
- Document complex test scenarios
- Use appropriate logging for debugging

## Common Tasks

### Running Tests
```bash
# Commands will depend on your test framework setup
# Add specific commands once configured
```

### Debugging
- Use Appium Inspector for element identification
- Check Appium server logs for connection issues
- Verify device/emulator configuration
- Review test execution logs

## Configuration

### Prerequisites
- Appium server installation
- Mobile device/emulator setup
- Application under test (AUT) access
- Required drivers (UIAutomator2, XCUITest, etc.)

### Environment Setup
- Configure device capabilities
- Set up test data management
- Configure reporting tools
- Set up CI/CD integration if needed

## Testing Strategy

### Test Types
- Smoke tests for critical paths
- Regression tests for core functionality
- End-to-end user journey tests
- UI component tests

### Test Data Management
- Maintain test data separately
- Use data-driven testing where applicable
- Clean up test data after execution
- Use test data factories or builders

## Continuous Integration

- Configure test execution in CI/CD pipeline
- Set up test result reporting
- Implement test failure notifications
- Archive test artifacts

## Troubleshooting

### Common Issues
- **Connection failures**: Verify Appium server is running
- **Element not found**: Check selectors and wait conditions
- **Timeout errors**: Adjust wait times and check app responsiveness
- **Capability errors**: Verify device capabilities configuration

## Resources

- [Appium Documentation](https://appium.io/docs/en/latest/)
- [3Shape Application Documentation](link-if-available)
- Project-specific documentation in `/docs` (if exists)

## Contact & Support

For questions about this test automation project, refer to the project README or contact the development team.

---

**Last Updated**: 2025-12-15
**Maintained By**: Test Automation Team
