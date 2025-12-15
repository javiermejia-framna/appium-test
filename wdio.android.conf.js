const { config } = require('./wdio.conf.js');

// Android specific configuration
config.capabilities = [
    {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:platformVersion': '13.0', // Update to your target version

        // App package and activity - UPDATE THESE WITH YOUR 3SHAPE APP DETAILS
        'appium:appPackage': 'com.threeshape.app', // Replace with actual package name
        'appium:appActivity': '.MainActivity', // Replace with actual activity name

        // Optional: If you need to install the app
        // 'appium:app': '/path/to/your/app.apk',

        // Performance settings
        'appium:noReset': true, // Keep app state between tests
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,

        // Additional Android settings
        'appium:autoGrantPermissions': true,
        'appium:disableWindowAnimation': true,

        // Wait settings
        'appium:waitForIdleTimeout': 0,
        'appium:androidInstallTimeout': 90000
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
