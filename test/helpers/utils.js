/**
 * Utility Helper Functions
 * Common utility functions used across tests
 */

const { TIMEOUTS } = require('./constants');

class Utils {
    /**
     * Wait for a specific amount of time
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise<void>}
     */
    static async sleep(ms) {
        await driver.pause(ms);
    }

    /**
     * Generate a random string
     * @param {number} length - Length of the string
     * @returns {string} Random string
     */
    static generateRandomString(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Generate a random email
     * @param {string} domain - Email domain (default: 3shape.com)
     * @returns {string} Random email address
     */
    static generateRandomEmail(domain = '3shape.com') {
        const randomStr = this.generateRandomString(8).toLowerCase();
        return `test.${randomStr}@${domain}`;
    }

    /**
     * Generate a random number within a range
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Take a screenshot
     * @param {string} filename - Name of the screenshot file
     */
    static async takeScreenshot(filename) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotName = `${filename}_${timestamp}.png`;
        await driver.saveScreenshot(`./screenshots/${screenshotName}`);
        console.log(`Screenshot saved: ${screenshotName}`);
    }

    /**
     * Get current timestamp
     * @returns {string} Current timestamp
     */
    static getTimestamp() {
        return new Date().toISOString();
    }

    /**
     * Format date to readable string
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    static formatDate(date = new Date()) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Wait for element with custom timeout
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<void>}
     */
    static async waitForElement(element, timeout = TIMEOUTS.MEDIUM) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Retry a function multiple times
     * @param {Function} fn - Function to retry
     * @param {number} retries - Number of retries
     * @param {number} delay - Delay between retries (ms)
     * @returns {Promise<any>} Result of the function
     */
    static async retry(fn, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === retries - 1) throw error;
                console.log(`Retry attempt ${i + 1} of ${retries}`);
                await this.sleep(delay);
            }
        }
    }

    /**
     * Check if element exists (without throwing error)
     * @param {string} selector - Element selector
     * @returns {Promise<boolean>} True if element exists
     */
    static async elementExists(selector) {
        try {
            const element = await $(selector);
            return await element.isExisting();
        } catch (error) {
            return false;
        }
    }

    /**
     * Scroll until element is visible
     * @param {string} selector - Element selector
     * @param {number} maxScrolls - Maximum number of scrolls
     * @returns {Promise<boolean>} True if element found
     */
    static async scrollToElement(selector, maxScrolls = 5) {
        for (let i = 0; i < maxScrolls; i++) {
            const element = await $(selector);
            if (await element.isDisplayed()) {
                return true;
            }
            // Scroll down
            await this.swipe('up');
            await this.sleep(500);
        }
        return false;
    }

    /**
     * Swipe on screen
     * @param {string} direction - Direction (up, down, left, right)
     */
    static async swipe(direction) {
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
     * Get platform name
     * @returns {Promise<string>} Platform name
     */
    static async getPlatform() {
        return await driver.capabilities.platformName;
    }

    /**
     * Check if running on Android
     * @returns {Promise<boolean>} True if Android
     */
    static async isAndroid() {
        const platform = await this.getPlatform();
        return platform.toLowerCase() === 'android';
    }

    /**
     * Check if running on iOS
     * @returns {Promise<boolean>} True if iOS
     */
    static async isIOS() {
        const platform = await this.getPlatform();
        return platform.toLowerCase() === 'ios';
    }
}

module.exports = Utils;
