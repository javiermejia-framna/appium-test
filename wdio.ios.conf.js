const { config } = require('./wdio.conf.js');

// iOS specific configuration - Real Device Setup
config.capabilities = [
    {
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone', // Real device
        'appium:platformVersion': '18.5',

        // 3Shape Dental Health Beta App
        'appium:bundleId': 'com.3shape.dentalhealth.beta',

        // Real device configuration
        'appium:udid': '00008101-001119603638001E',
        'appium:xcodeOrgId': 'TUGFNJHXEQ',
        'appium:xcodeSigningId': 'iPhone Developer',

        // Performance settings
        'appium:noReset': true, // Keep app state between tests
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,

        // iOS specific settings
        'appium:autoAcceptAlerts': false,
        'appium:autoDismissAlerts': false,
        'appium:useNewWDA': false,
        'appium:wdaLaunchTimeout': 120000,
        'appium:wdaConnectionTimeout': 120000,

        // WebDriverAgent settings for real device
        'appium:updatedWDABundleId': 'com.facebook.WebDriverAgentRunner',
        'appium:usePrebuiltWDA': false,

        // Set to false for real device
        'appium:isSimulator': false,

        // Enable detailed Xcode build logs for troubleshooting
        'appium:showXcodeLog': true
    }
];

// Appium service configuration
config.services = [
    ['appium', {
        command: 'appium',
        args: {
            address: 'localhost',
            port: 4723,
            relaxedSecurity: true,
            logLevel: 'info'
        }
    }]
];

config.port = 4723;

exports.config = config;
