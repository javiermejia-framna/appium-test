const BasePage = require('./BasePage');

/**
 * Login Page Object
 * Represents the login screen of the 3Shape app
 *
 * NOTE: Update the selectors below with the actual element IDs/accessibility IDs
 * from your 3Shape app using Appium Inspector
 */
class LoginPage extends BasePage {
    /**
     * Define selectors for Android and iOS
     * Use accessibility IDs when possible for cross-platform compatibility
     */
    get selectors() {
        return {
            // Example selectors - UPDATE THESE WITH YOUR ACTUAL APP SELECTORS
            username: {
                android: '~username-input', // accessibility id
                ios: '~username-input'
            },
            password: {
                android: '~password-input',
                ios: '~password-input'
            },
            loginButton: {
                android: '~login-button',
                ios: '~login-button'
            },
            errorMessage: {
                android: 'id=error-message', // resource-id
                ios: '~error-message'
            },
            forgotPasswordLink: {
                android: '~forgot-password-link',
                ios: '~forgot-password-link'
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
     * Get username input element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getUsernameInput() {
        const selector = await this.getSelector('username');
        return await $(selector);
    }

    /**
     * Get password input element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getPasswordInput() {
        const selector = await this.getSelector('password');
        return await $(selector);
    }

    /**
     * Get login button element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getLoginButton() {
        const selector = await this.getSelector('loginButton');
        return await $(selector);
    }

    /**
     * Get error message element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getErrorMessage() {
        const selector = await this.getSelector('errorMessage');
        return await $(selector);
    }

    /**
     * Enter username
     * @param {string} username - Username to enter
     */
    async enterUsername(username) {
        const usernameInput = await this.getUsernameInput();
        await this.setValue(usernameInput, username);
    }

    /**
     * Enter password
     * @param {string} password - Password to enter
     */
    async enterPassword(password) {
        const passwordInput = await this.getPasswordInput();
        await this.setValue(passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        const loginButton = await this.getLoginButton();
        await this.clickElement(loginButton);
    }

    /**
     * Perform login with credentials
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.hideKeyboard();
        await this.clickLogin();
    }

    /**
     * Check if login page is displayed
     * @returns {Promise<boolean>} True if login page is displayed
     */
    async isLoginPageDisplayed() {
        const usernameInput = await this.getUsernameInput();
        return await this.isDisplayed(usernameInput);
    }

    /**
     * Get error message text
     * @returns {Promise<string>} Error message text
     */
    async getErrorMessageText() {
        const errorMsg = await this.getErrorMessage();
        return await this.getText(errorMsg);
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>} True if error message is displayed
     */
    async isErrorMessageDisplayed() {
        const errorMsg = await this.getErrorMessage();
        return await this.isDisplayed(errorMsg);
    }
}

module.exports = new LoginPage();
