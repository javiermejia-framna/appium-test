# CLAUDE.MD - AI Assistant Context

## Project Overview

This is a WebDriverIO + Appium test automation framework for the 3Shape native mobile application. It supports automated testing on both Android and iOS platforms using the Page Object Model design pattern.

## Project Structure

```
appium-test/
├── test/
│   ├── specs/              # Test specifications (Mocha tests)
│   │   ├── login.spec.js   # Login functionality tests
│   │   └── home.spec.js    # Home page tests
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.js     # Base class with common methods
│   │   ├── LoginPage.js    # Login page object
│   │   └── HomePage.js     # Home page object
│   ├── helpers/            # Utility modules
│   │   ├── constants.js    # App constants and test data
│   │   ├── utils.js        # Common utility functions
│   │   └── gestures.js     # Touch gesture helpers
│   └── data/               # Test data files
├── screenshots/            # Auto-generated screenshots
├── wdio.conf.js           # Base WebDriverIO configuration
├── wdio.android.conf.js   # Android-specific configuration
├── wdio.ios.conf.js       # iOS-specific configuration
├── package.json           # Dependencies and scripts
├── README.md              # Detailed setup and usage guide
└── CLAUDE.MD              # This file
```

## Technology Stack

- **Appium 2.x** - Mobile automation server
- **WebDriverIO 8.x** - Test automation framework
- **Mocha** - Test runner and framework
- **Chai** - Assertion library
- **UIAutomator2** - Android driver
- **XCUITest** - iOS driver
- **Node.js** - Runtime environment
- **JavaScript** - Programming language

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
# Run all tests on Android
npm run test:android

# Run all tests on iOS
npm run test:ios

# Run specific test file
npx wdio run wdio.android.conf.js --spec ./test/specs/login.spec.js

# Run tests matching a pattern
npx wdio run wdio.android.conf.js --mochaOpts.grep "login successfully"
```

### Before First Run
1. Update app package/bundle ID in config files:
   - `wdio.android.conf.js` - Set `appPackage` and `appActivity`
   - `wdio.ios.conf.js` - Set `bundleId`

2. Update element selectors in page objects using Appium Inspector

3. Update test credentials in `test/helpers/constants.js`

4. Start Appium server: `appium`

5. Ensure device/emulator is running and connected

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

## Architecture Details

### Page Object Model Implementation

**BasePage** (`test/pages/BasePage.js`):
- Abstract base class for all page objects
- Provides common methods: `waitForElement()`, `clickElement()`, `setValue()`, `getText()`
- Includes platform detection: `isAndroid()`, `isIOS()`, `getPlatform()`
- Gesture support: `swipe()`, `hideKeyboard()`, `scrollToElement()`

**Page Objects** (extend BasePage):
- Define platform-specific selectors (Android and iOS)
- Implement page-specific actions and getters
- Use `getSelector()` method to return platform-appropriate selector
- Exported as singleton instances

Example Pattern:
```javascript
class LoginPage extends BasePage {
    get selectors() {
        return {
            username: {
                android: '~username-input',
                ios: '~username-input'
            }
        };
    }

    async getSelector(elementName) {
        const platform = await this.isAndroid() ? 'android' : 'ios';
        return this.selectors[elementName][platform];
    }
}
module.exports = new LoginPage();
```

### Helper Modules

**constants.js**:
- App package names and bundle IDs
- Timeout values (SHORT: 5s, MEDIUM: 10s, LONG: 30s)
- Test user credentials
- Error messages
- Swipe directions and platform names

**utils.js**:
- `sleep(ms)` - Pause execution
- `generateRandomEmail()` - Create test emails
- `takeScreenshot(filename)` - Capture screenshots
- `retry(fn, retries, delay)` - Retry logic
- `scrollToElement(selector, maxScrolls)` - Scroll until visible

**gestures.js**:
- `swipe({startX, startY, endX, endY})` - Custom swipe
- `swipeByDirection(direction, percentage)` - Directional swipe
- `tap(x, y)` / `doubleTap(x, y)` - Tap gestures
- `longPress(x, y, duration)` - Long press
- `pinchZoomIn/Out(element, scale)` - Pinch gestures
- `dragAndDrop(source, target)` - Drag and drop

### Configuration Files

**wdio.conf.js** (Base):
- Shared configuration for both platforms
- Mocha framework with 60s timeout
- Spec reporter
- Global hooks (onPrepare, before, after, onComplete)

**wdio.android.conf.js**:
- Extends base config
- Android-specific capabilities (platformName, automationName, appPackage, appActivity)
- Appium service with port 4723

**wdio.ios.conf.js**:
- Extends base config
- iOS-specific capabilities (platformName, automationName, bundleId)
- XCUITest configuration

### Test Structure

Tests use Mocha's BDD syntax:
- `describe()` - Test suite grouping
- `before/beforeEach()` - Setup hooks
- `it()` - Individual test cases
- `after/afterEach()` - Cleanup hooks
- Chai assertions: `expect().to.be.true`, `expect().to.include()`

## Key Implementation Notes

1. **Selector Strategy**: Prefer accessibility IDs (`~element-id`) over resource IDs or XPath
2. **Platform Handling**: All page objects support both platforms via selector mapping
3. **Wait Strategy**: Explicit waits via `waitForDisplayed()`, avoid `driver.pause()`
4. **Test Independence**: Each test should be runnable independently
5. **Credentials**: Currently in constants.js, should move to env vars for production
6. **Screenshots**: Saved to `screenshots/` directory with timestamps

## Adding New Tests

1. **New Page Object**:
   ```bash
   # Create in test/pages/
   cp test/pages/LoginPage.js test/pages/NewPage.js
   # Update selectors and methods
   ```

2. **New Test Spec**:
   ```bash
   # Create in test/specs/
   cp test/specs/login.spec.js test/specs/newfeature.spec.js
   # Update test cases
   ```

3. **Update Selectors**:
   - Use Appium Inspector to find elements
   - Add to page object's `selectors` object
   - Implement getter method

## Resources

- [Appium Documentation](https://appium.io/docs/en/latest/)
- [WebDriverIO Documentation](https://webdriver.io/)
- [Appium Inspector](https://github.com/appium/appium-inspector)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertions](https://www.chaijs.com/)
- See README.md for detailed setup instructions

## Contact & Support

For questions about this test automation project:
- Check README.md for setup and troubleshooting
- Review test/pages/ for page object examples
- Check test/specs/ for test case examples
- Contact the QA/Test Automation team

---

**Last Updated**: 2025-12-15
**Maintained By**: Test Automation Team
**Framework Version**: WebDriverIO 8.x + Appium 2.x
