// Simple standalone Appium test to verify iOS connection
const { remote } = require('webdriverio');

async function testIOSConnection() {
    console.log('Starting Appium session...');

    const capabilities = {
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone',
        'appium:platformVersion': '18.5',
        'appium:bundleId': 'com.3shape.dentalhealth.beta',
        'appium:udid': '00008101-001119603638001E',
        'appium:xcodeOrgId': 'A6RBXW88QR',
        'appium:xcodeSigningId': 'iPhone Developer',
        'appium:noReset': true,
        'appium:newCommandTimeout': 240,
        'appium:wdaLaunchTimeout': 120000,
        'appium:wdaConnectionTimeout': 120000,
        'appium:updatedWDABundleId': 'com.facebook.WebDriverAgentRunner',
        'appium:usePrebuiltWDA': false,
        'appium:isSimulator': false
    };

    const wdOpts = {
        hostname: 'localhost',
        port: 4723,
        logLevel: 'info',
        capabilities
    };

    let driver;
    try {
        driver = await remote(wdOpts);
        console.log('✅ Successfully connected to iOS device!');
        console.log('Session ID:', driver.sessionId);

        // Get some basic info
        const source = await driver.getPageSource();
        console.log('✅ App launched successfully!');
        console.log('Page source length:', source.length);

        await driver.deleteSession();
        console.log('✅ Session closed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (driver) {
            await driver.deleteSession();
        }
        process.exit(1);
    }
}

testIOSConnection();
