const BasePage = require('./BasePage');

/**
 * Home Page Object
 * Represents the home/dashboard screen of the 3Shape app
 *
 * NOTE: Update the selectors below with the actual element IDs/accessibility IDs
 * from your 3Shape app using Appium Inspector
 */
class HomePage extends BasePage {
    /**
     * Define selectors for Android and iOS
     */
    get selectors() {
        return {
            // Example selectors - UPDATE THESE WITH YOUR ACTUAL APP SELECTORS
            homeScreen: {
                android: '~home-screen',
                ios: '~home-screen'
            },
            welcomeMessage: {
                android: 'id=welcome-message',
                ios: '~welcome-message'
            },
            menuButton: {
                android: '~menu-button',
                ios: '~menu-button'
            },
            settingsButton: {
                android: '~settings-button',
                ios: '~settings-button'
            },
            logoutButton: {
                android: '~logout-button',
                ios: '~logout-button'
            }
        };
    }

    /**
     * Get platform-specific selector
     * @param {string} elementName - Name of the element
     * @returns {Promise<string>} Platform-specific selector
     */
    async getSelector(elementName) {
        const isAndroid = await this.isAndroid();
        const platform = isAndroid ? 'android' : 'ios';
        return this.selectors[elementName][platform];
    }

    /**
     * Get home screen element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getHomeScreen() {
        const selector = await this.getSelector('homeScreen');
        return await $(selector);
    }

    /**
     * Get welcome message element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getWelcomeMessage() {
        const selector = await this.getSelector('welcomeMessage');
        return await $(selector);
    }

    /**
     * Get menu button element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getMenuButton() {
        const selector = await this.getSelector('menuButton');
        return await $(selector);
    }

    /**
     * Get settings button element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getSettingsButton() {
        const selector = await this.getSelector('settingsButton');
        return await $(selector);
    }

    /**
     * Get logout button element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getLogoutButton() {
        const selector = await this.getSelector('logoutButton');
        return await $(selector);
    }

    /**
     * Check if home page is displayed
     * @returns {Promise<boolean>} True if home page is displayed
     */
    async isHomePageDisplayed() {
        const homeScreen = await this.getHomeScreen();
        return await this.isDisplayed(homeScreen);
    }

    /**
     * Get welcome message text
     * @returns {Promise<string>} Welcome message text
     */
    async getWelcomeMessageText() {
        const welcomeMsg = await this.getWelcomeMessage();
        return await this.getText(welcomeMsg);
    }

    /**
     * Open menu
     */
    async openMenu() {
        const menuButton = await this.getMenuButton();
        await this.clickElement(menuButton);
    }

    /**
     * Open settings
     */
    async openSettings() {
        const settingsButton = await this.getSettingsButton();
        await this.clickElement(settingsButton);
    }

    /**
     * Perform logout
     */
    async logout() {
        const logoutButton = await this.getLogoutButton();
        await this.clickElement(logoutButton);
    }

    /**
     * Wait for home page to load
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForHomePageToLoad(timeout = 10000) {
        const homeScreen = await this.getHomeScreen();
        await this.waitForElement(homeScreen, timeout);
    }
}

module.exports = new HomePage();
