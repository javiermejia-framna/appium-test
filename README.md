# 3Shape Mobile Test Automation

Test Automation framework for the 3Shape mobile application using Appium and WebDriverIO.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This project provides automated testing for the 3Shape mobile application on both Android and iOS platforms using:

- **Appium 2.x** - Mobile automation framework
- **WebDriverIO 8.x** - Test automation framework
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Page Object Model** - Design pattern for maintainable tests

## Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   ```bash
   node --version
   ```

2. **Appium 2.x**
   ```bash
   npm install -g appium
   appium --version
   ```

3. **Appium Drivers**
   ```bash
   # For Android
   appium driver install uiautomator2

   # For iOS
   appium driver install xcuitest
   ```

### Android Setup

1. **Android Studio** with Android SDK
2. **Android Emulator** or physical device
3. **Environment Variables**:
   ```bash
   export ANDROID_HOME=/path/to/android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

4. **Verify ADB**:
   ```bash
   adb devices
   ```

### iOS Setup (macOS only)

1. **Xcode** (latest version)
2. **Xcode Command Line Tools**:
   ```bash
   xcode-select --install
   ```

3. **iOS Simulator** or physical device
4. **Carthage** (for XCUITest driver):
   ```bash
   brew install carthage
   ```

5. **For real devices**: Valid Apple Developer account and provisioning profiles

## Project Structure

```
appium-test/
├── test/
│   ├── specs/              # Test specifications
│   │   ├── login.spec.js
│   │   └── home.spec.js
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   └── HomePage.js
│   ├── helpers/            # Helper utilities
│   │   ├── constants.js
│   │   ├── utils.js
│   │   └── gestures.js
│   └── data/               # Test data files
├── screenshots/            # Test screenshots
├── wdio.conf.js           # Base WebDriverIO config
├── wdio.android.conf.js   # Android-specific config
├── wdio.ios.conf.js       # iOS-specific config
└── package.json
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd appium-test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Appium server** (in a separate terminal):
   ```bash
   appium
   ```

## Configuration

### Update App Information

Before running tests, update the configuration files with your app details:

#### For Android (`wdio.android.conf.js`):
```javascript
'appium:appPackage': 'com.your.actual.package',
'appium:appActivity': '.YourActualActivity'
```

To find these values:
```bash
# Get package name and activity from installed app
adb shell dumpsys window | grep -E 'mCurrentFocus'
```

#### For iOS (`wdio.ios.conf.js`):
```javascript
'appium:bundleId': 'com.your.actual.bundleid'
```

To find bundle ID:
```bash
# List installed apps on simulator
xcrun simctl listapps booted
```

### Update Test Credentials

Update credentials in `test/helpers/constants.js`:
```javascript
TEST_USERS: {
    VALID_USER: {
        USERNAME: 'your-test-username',
        PASSWORD: 'your-test-password'
    }
}
```

### Update Page Object Selectors

Use **Appium Inspector** to find element selectors:

1. Start Appium server
2. Open Appium Inspector
3. Connect to your app
4. Find element accessibility IDs or resource IDs
5. Update selectors in page objects (e.g., `LoginPage.js`)

## Running Tests

### Run all tests (default platform)
```bash
npm test
```

### Run tests on Android
```bash
npm run test:android
```

### Run tests on iOS
```bash
npm run test:ios
```

### Run specific test file
```bash
npx wdio run wdio.android.conf.js --spec ./test/specs/login.spec.js
```

### Run tests with specific grep pattern
```bash
npx wdio run wdio.android.conf.js --mochaOpts.grep "login successfully"
```

## Writing Tests

### Creating a New Page Object

1. Create a new file in `test/pages/`
2. Extend `BasePage` class
3. Define platform-specific selectors
4. Implement page actions

Example:
```javascript
const BasePage = require('./BasePage');

class SettingsPage extends BasePage {
    get selectors() {
        return {
            settingsTitle: {
                android: '~settings-title',
                ios: '~settings-title'
            }
        };
    }

    async getSelector(elementName) {
        const isAndroid = await this.isAndroid();
        const platform = isAndroid ? 'android' : 'ios';
        return this.selectors[elementName][platform];
    }

    // Add page-specific methods here
}

module.exports = new SettingsPage();
```

### Creating a New Test

1. Create a new file in `test/specs/`
2. Import required page objects
3. Write test cases using Mocha and Chai

Example:
```javascript
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');

describe('Feature Name', () => {
    it('should perform action', async () => {
        await LoginPage.login('user', 'pass');
        const result = await LoginPage.isLoginPageDisplayed();
        expect(result).to.be.true;
    });
});
```

## Best Practices

### Test Design
- Keep tests independent and isolated
- Use Page Object Model pattern
- Avoid hard-coded waits (use explicit waits)
- Use meaningful test and method names
- One assertion per test (when possible)

### Selectors
- Prefer accessibility IDs over XPath
- Use resource IDs on Android
- Avoid fragile selectors (text, indexes)
- Keep selectors in page objects

### Maintenance
- Update selectors when UI changes
- Keep test data separate from test logic
- Use constants for reusable values
- Document complex test scenarios

## Troubleshooting

### Common Issues

#### 1. Appium server not starting
```bash
# Check if port 4723 is in use
lsof -i :4723

# Kill process if needed
kill -9 <PID>

# Start Appium on different port
appium --port 4724
```

#### 2. Device/Emulator not found
```bash
# Android
adb devices
adb kill-server
adb start-server

# iOS
xcrun simctl list devices
```

#### 3. Element not found
- Verify selector using Appium Inspector
- Add explicit waits
- Check if element is in a different context
- Ensure app is in correct state

#### 4. Session creation timeout
- Increase `newCommandTimeout` in config
- Ensure device/emulator is running
- Check Appium server logs

#### 5. Tests failing randomly
- Increase wait timeouts
- Add proper synchronization
- Check for app animations/transitions
- Verify network connectivity

### Logs

View Appium server logs:
```bash
appium --log appium.log
```

Enable verbose logging in WebDriverIO config:
```javascript
logLevel: 'debug'
```

## Contributing

1. Create a feature branch
2. Write tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

## Resources

- [Appium Documentation](https://appium.io/docs/en/latest/)
- [WebDriverIO Documentation](https://webdriver.io/)
- [Appium Inspector](https://github.com/appium/appium-inspector)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertions](https://www.chaijs.com/)

## Support

For issues and questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review Appium server logs
- Consult team documentation
- Contact the QA team
