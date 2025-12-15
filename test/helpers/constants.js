/**
 * Application Constants
 * Store all app-specific constants here
 */

module.exports = {
    // App Information
    APP: {
        PACKAGE_NAME: {
            ANDROID: 'com.threeshape.app', // Update with actual package name
            IOS: 'com.threeshape.app' // Update with actual bundle ID
        },
        ACTIVITY_NAME: {
            ANDROID: '.MainActivity' // Update with actual activity name
        }
    },

    // Timeout values (in milliseconds)
    TIMEOUTS: {
        SHORT: 5000,
        MEDIUM: 10000,
        LONG: 30000,
        VERY_LONG: 60000
    },

    // Test Credentials
    // NOTE: In production, use environment variables or secure credential management
    TEST_USERS: {
        VALID_USER: {
            USERNAME: 'testuser@3shape.com',
            PASSWORD: 'TestPassword123'
        },
        INVALID_USER: {
            USERNAME: 'invalid@3shape.com',
            PASSWORD: 'wrongpassword'
        },
        ADMIN_USER: {
            USERNAME: 'admin@3shape.com',
            PASSWORD: 'AdminPassword123'
        }
    },

    // Error Messages
    ERROR_MESSAGES: {
        INVALID_CREDENTIALS: 'Invalid username or password',
        EMPTY_USERNAME: 'Username is required',
        EMPTY_PASSWORD: 'Password is required',
        NETWORK_ERROR: 'Network connection failed'
    },

    // Swipe Directions
    SWIPE: {
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right'
    },

    // Platform Names
    PLATFORM: {
        ANDROID: 'Android',
        IOS: 'iOS'
    },

    // Screen Names (for navigation)
    SCREENS: {
        LOGIN: 'Login',
        HOME: 'Home',
        SETTINGS: 'Settings',
        PROFILE: 'Profile'
    }
};
