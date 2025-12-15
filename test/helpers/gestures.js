/**
 * Gestures Helper
 * Advanced touch gestures for mobile automation
 */

class Gestures {
    /**
     * Perform a swipe gesture
     * @param {object} options - Swipe options
     * @param {number} options.startX - Start X coordinate
     * @param {number} options.startY - Start Y coordinate
     * @param {number} options.endX - End X coordinate
     * @param {number} options.endY - End Y coordinate
     * @param {number} options.duration - Duration of swipe in ms (default: 1000)
     */
    static async swipe({ startX, startY, endX, endY, duration = 1000 }) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration, x: endX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Swipe by direction
     * @param {string} direction - up, down, left, right
     * @param {number} percentage - Distance to swipe as percentage of screen (default: 0.6)
     */
    static async swipeByDirection(direction, percentage = 0.6) {
        const { width, height } = await driver.getWindowSize();
        const centerX = width / 2;
        const centerY = height / 2;

        let startX, startY, endX, endY;

        switch (direction.toLowerCase()) {
            case 'up':
                startX = centerX;
                startY = height * (0.5 + percentage / 2);
                endX = centerX;
                endY = height * (0.5 - percentage / 2);
                break;
            case 'down':
                startX = centerX;
                startY = height * (0.5 - percentage / 2);
                endX = centerX;
                endY = height * (0.5 + percentage / 2);
                break;
            case 'left':
                startX = width * (0.5 + percentage / 2);
                startY = centerY;
                endX = width * (0.5 - percentage / 2);
                endY = centerY;
                break;
            case 'right':
                startX = width * (0.5 - percentage / 2);
                startY = centerY;
                endX = width * (0.5 + percentage / 2);
                endY = centerY;
                break;
            default:
                throw new Error(`Invalid swipe direction: ${direction}`);
        }

        await this.swipe({ startX, startY, endX, endY });
    }

    /**
     * Swipe on element
     * @param {WebdriverIO.Element} element - Element to swipe on
     * @param {string} direction - up, down, left, right
     * @param {number} percentage - Distance to swipe (default: 0.5)
     */
    static async swipeOnElement(element, direction, percentage = 0.5) {
        const rect = await driver.getElementRect(element.elementId);
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        let startX, startY, endX, endY;

        switch (direction.toLowerCase()) {
            case 'up':
                startX = centerX;
                startY = rect.y + rect.height * (0.5 + percentage / 2);
                endX = centerX;
                endY = rect.y + rect.height * (0.5 - percentage / 2);
                break;
            case 'down':
                startX = centerX;
                startY = rect.y + rect.height * (0.5 - percentage / 2);
                endX = centerX;
                endY = rect.y + rect.height * (0.5 + percentage / 2);
                break;
            case 'left':
                startX = rect.x + rect.width * (0.5 + percentage / 2);
                startY = centerY;
                endX = rect.x + rect.width * (0.5 - percentage / 2);
                endY = centerY;
                break;
            case 'right':
                startX = rect.x + rect.width * (0.5 - percentage / 2);
                startY = centerY;
                endX = rect.x + rect.width * (0.5 + percentage / 2);
                endY = centerY;
                break;
            default:
                throw new Error(`Invalid swipe direction: ${direction}`);
        }

        await this.swipe({ startX, startY, endX, endY });
    }

    /**
     * Tap at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    static async tap(x, y) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Double tap at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    static async doubleTap(x, y) {
        await this.tap(x, y);
        await driver.pause(100);
        await this.tap(x, y);
    }

    /**
     * Long press at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} duration - Duration in ms (default: 1000)
     */
    static async longPress(x, y, duration = 1000) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Long press on element
     * @param {WebdriverIO.Element} element - Element to long press
     * @param {number} duration - Duration in ms (default: 1000)
     */
    static async longPressElement(element, duration = 1000) {
        const rect = await driver.getElementRect(element.elementId);
        const x = rect.x + rect.width / 2;
        const y = rect.y + rect.height / 2;
        await this.longPress(x, y, duration);
    }

    /**
     * Pinch to zoom (zoom in)
     * @param {WebdriverIO.Element} element - Element to pinch
     * @param {number} scale - Scale factor (default: 2)
     */
    static async pinchZoomIn(element, scale = 2) {
        const rect = await driver.getElementRect(element.elementId);
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const distance = Math.min(rect.width, rect.height) / 4;
        const targetDistance = distance * scale;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - distance, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX - targetDistance, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + distance, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX + targetDistance, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Pinch to zoom out
     * @param {WebdriverIO.Element} element - Element to pinch
     * @param {number} scale - Scale factor (default: 0.5)
     */
    static async pinchZoomOut(element, scale = 0.5) {
        const rect = await driver.getElementRect(element.elementId);
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const distance = Math.min(rect.width, rect.height) / 3;
        const targetDistance = distance * scale;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - distance, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX - targetDistance, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + distance, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX + targetDistance, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Drag and drop
     * @param {WebdriverIO.Element} sourceElement - Source element
     * @param {WebdriverIO.Element} targetElement - Target element
     * @param {number} duration - Duration in ms (default: 1000)
     */
    static async dragAndDrop(sourceElement, targetElement, duration = 1000) {
        const sourceRect = await driver.getElementRect(sourceElement.elementId);
        const targetRect = await driver.getElementRect(targetElement.elementId);

        const startX = sourceRect.x + sourceRect.width / 2;
        const startY = sourceRect.y + sourceRect.height / 2;
        const endX = targetRect.x + targetRect.width / 2;
        const endY = targetRect.y + targetRect.height / 2;

        await this.swipe({ startX, startY, endX, endY, duration });
    }
}

module.exports = Gestures;
