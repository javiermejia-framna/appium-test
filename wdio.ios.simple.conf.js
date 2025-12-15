const { config } = require('./wdio.conf.js');

// Simplified iOS configuration - Let Appium auto-detect signing
// Use this if you're having Team ID or code signing issues
config.capabilities = [
    {
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone',
        'appium:platformVersion': '18.5',

        // 3Shape Dental Health Beta App
        'appium:bundleId': 'com.3shape.dentalhealth.beta',

        // Real device UDID
        'appium:udid': '00008101-001119603638001E',

        // Basic settings
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,

        // Extended timeouts for real device
        'appium:wdaLaunchTimeout': 180000,
        'appium:wdaConnectionTimeout': 180000,

        // Enable detailed logging
        'appium:showXcodeLog': true,

        // Let Appium handle WebDriverAgent signing automatically
        // Remove explicit signing settings to allow auto-detection
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
