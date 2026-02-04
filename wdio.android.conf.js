const { config } = require('./wdio.conf.js');

// Android specific configuration - Real device with com.threeshape.beta
config.capabilities = [
    {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Device',

        // 3Shape Beta app (already installed on device)
        'appium:appPackage': 'com.threeshape.beta',
        // Let Appium auto-detect the launcher activity
        'appium:appWaitActivity': '*',

        // App state settings
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300,

        // Android settings
        'appium:autoGrantPermissions': true,
        'appium:disableWindowAnimation': true,

        // Wait settings
        'appium:waitForIdleTimeout': 0,
        'appium:androidInstallTimeout': 90000,
        'appium:adbExecTimeout': 60000
    }
];

// Connect to an already-running Appium server (e.g. started via MCP or externally)
// Remove the appium service so we don't try to start one locally
config.services = [];

config.hostname = 'localhost';
config.port = 4723;
config.path = '/';

exports.config = config;
