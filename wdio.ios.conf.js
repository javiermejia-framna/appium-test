const { config } = require('./wdio.conf.js');

// iOS specific configuration
config.capabilities = [
    {
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone 14', // Update to your target device
        'appium:platformVersion': '16.0', // Update to your target version

        // Bundle ID - UPDATE THIS WITH YOUR 3SHAPE APP DETAILS
        'appium:bundleId': 'com.threeshape.app', // Replace with actual bundle ID

        // Optional: If you need to install the app
        // 'appium:app': '/path/to/your/app.app',

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

        // Simulator settings (remove if using real device)
        'appium:isSimulator': true,

        // Uncomment if using real device
        // 'appium:udid': 'YOUR_DEVICE_UDID',
        // 'appium:xcodeOrgId': 'YOUR_TEAM_ID',
        // 'appium:xcodeSigningId': 'iPhone Developer'
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
