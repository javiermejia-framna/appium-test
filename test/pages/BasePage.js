/**
 * Base Page Object class
 * All page objects should extend this class to inherit common functionality
 */
class BasePage {
    /**
     * Wait for an element to be displayed
     * @param {WebdriverIO.Element} element - The element to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for an element to be clickable and click it
     * @param {WebdriverIO.Element} element - The element to click
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async clickElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        await element.click();
    }

    /**
     * Set value in an input field
     * @param {WebdriverIO.Element} element - The input element
     * @param {string} value - The value to set
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async setValue(element, value, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Get text from an element
     * @param {WebdriverIO.Element} element - The element to get text from
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {Promise<string>} The element text
     */
    async getText(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param {WebdriverIO.Element} element - The element to check
     * @returns {Promise<boolean>} True if element is displayed
     */
    async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Scroll to element
     * @param {WebdriverIO.Element} element - The element to scroll to
     */
    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    /**
     * Wait for element to disappear
     * @param {WebdriverIO.Element} element - The element to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async waitForElementToDisappear(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout, reverse: true });
    }

    /**
     * Swipe on screen
     * @param {string} direction - Direction to swipe (up, down, left, right)
     */
    async swipe(direction) {
        const { width, height } = await driver.getWindowSize();
        const centerX = width / 2;
        const centerY = height / 2;

        let startX, startY, endX, endY;

        switch (direction.toLowerCase()) {
            case 'up':
                startX = centerX;
                startY = height * 0.8;
                endX = centerX;
                endY = height * 0.2;
                break;
            case 'down':
                startX = centerX;
                startY = height * 0.2;
                endX = centerX;
                endY = height * 0.8;
                break;
            case 'left':
                startX = width * 0.8;
                startY = centerY;
                endX = width * 0.2;
                endY = centerY;
                break;
            case 'right':
                startX = width * 0.2;
                startY = centerY;
                endX = width * 0.8;
                endY = centerY;
                break;
            default:
                throw new Error(`Invalid swipe direction: ${direction}`);
        }

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: endX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Hide keyboard (mobile)
     */
    async hideKeyboard() {
        try {
            await driver.hideKeyboard();
        } catch (error) {
            // Keyboard might not be visible, ignore error
            console.log('Keyboard not visible or already hidden');
        }
    }

    /**
     * Get platform name
     * @returns {Promise<string>} Platform name (Android or iOS)
     */
    async getPlatform() {
        return await driver.capabilities.platformName;
    }

    /**
     * Check if platform is Android
     * @returns {Promise<boolean>} True if Android
     */
    async isAndroid() {
        const platform = await this.getPlatform();
        return platform.toLowerCase() === 'android';
    }

    /**
     * Check if platform is iOS
     * @returns {Promise<boolean>} True if iOS
     */
    async isIOS() {
        const platform = await this.getPlatform();
        return platform.toLowerCase() === 'ios';
    }
}

module.exports = BasePage;
