const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

describe('3Shape App - Home Page Tests', () => {
    /**
     * Before all tests, login to the app
     */
    before(async () => {
        console.log('Logging in before home page tests...');

        // TODO: Replace with actual valid test credentials
        const username = 'testuser@3shape.com';
        const password = 'TestPassword123';

        // Check if already logged in
        const isHomePageDisplayed = await HomePage.isHomePageDisplayed();

        if (!isHomePageDisplayed) {
            // Login if not already logged in
            const isLoginPageDisplayed = await LoginPage.isLoginPageDisplayed();
            if (isLoginPageDisplayed) {
                await LoginPage.login(username, password);
                await HomePage.waitForHomePageToLoad();
            }
        }
    });

    /**
     * Test Case: Verify home page loads successfully
     */
    it('should display home page after login', async () => {
        const isDisplayed = await HomePage.isHomePageDisplayed();
        expect(isDisplayed).to.be.true;
    });

    /**
     * Test Case: Verify welcome message is displayed
     */
    it('should display welcome message on home page', async () => {
        const welcomeText = await HomePage.getWelcomeMessageText();

        // Verify welcome message contains expected text
        // Update assertion based on your app's actual welcome message
        expect(welcomeText).to.not.be.empty;
    });

    /**
     * Test Case: Verify menu can be opened
     */
    it('should open menu when menu button is clicked', async () => {
        await HomePage.openMenu();

        // Add assertion to verify menu is displayed
        // This depends on your app's implementation
        await driver.pause(1000); // Wait for menu animation

        // Example: Check if a menu item is visible
        // const isMenuVisible = await SomeMenuElement.isDisplayed();
        // expect(isMenuVisible).to.be.true;
    });

    /**
     * Test Case: Verify settings can be accessed
     */
    it('should navigate to settings when settings button is clicked', async () => {
        await HomePage.openSettings();

        // Add assertion to verify settings page is displayed
        await driver.pause(1000); // Wait for navigation

        // Example: Check if settings page is visible
        // const isSettingsPageVisible = await SettingsPage.isDisplayed();
        // expect(isSettingsPageVisible).to.be.true;

        // Navigate back to home if needed
        // await driver.back();
    });

    /**
     * Test Case: Verify swipe gesture works
     */
    it('should respond to swipe gestures', async () => {
        // Test swipe functionality if your app supports it
        await HomePage.swipe('up');
        await driver.pause(500);

        await HomePage.swipe('down');
        await driver.pause(500);

        // Verify page is still displayed after swiping
        const isDisplayed = await HomePage.isHomePageDisplayed();
        expect(isDisplayed).to.be.true;
    });

    /**
     * Test Case: Verify platform-specific behavior
     */
    it('should correctly identify the platform', async () => {
        const isAndroid = await HomePage.isAndroid();
        const isIOS = await HomePage.isIOS();

        // One of them should be true
        expect(isAndroid || isIOS).to.be.true;

        // But not both
        expect(isAndroid && isIOS).to.be.false;

        // Log platform for debugging
        const platform = await HomePage.getPlatform();
        console.log(`Running on platform: ${platform}`);
    });

    /**
     * After all tests, optionally logout
     */
    after(async () => {
        console.log('Home page tests completed');
        // Optionally logout or reset app state
        // await HomePage.logout();
    });
});
