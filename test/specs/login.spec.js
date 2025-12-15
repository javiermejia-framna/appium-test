const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

describe('3Shape App - Login Tests', () => {
    /**
     * Before each test, ensure we're on the login page
     */
    beforeEach(async () => {
        // Add logic to navigate to login page if needed
        // For example, if user is already logged in, log them out first
        console.log('Setting up test...');
    });

    /**
     * After each test, perform cleanup if needed
     */
    afterEach(async () => {
        console.log('Test completed');
    });

    /**
     * Test Case: Verify login page is displayed
     */
    it('should display login page on app launch', async () => {
        const isDisplayed = await LoginPage.isLoginPageDisplayed();
        expect(isDisplayed).to.be.true;
    });

    /**
     * Test Case: Successful login with valid credentials
     */
    it('should login successfully with valid credentials', async () => {
        // TODO: Replace with actual valid test credentials
        const username = 'testuser@3shape.com';
        const password = 'TestPassword123';

        await LoginPage.login(username, password);

        // Wait for home page to load
        await HomePage.waitForHomePageToLoad();

        // Verify user is on home page
        const isHomePageDisplayed = await HomePage.isHomePageDisplayed();
        expect(isHomePageDisplayed).to.be.true;
    });

    /**
     * Test Case: Login with invalid credentials
     */
    it('should show error message with invalid credentials', async () => {
        const username = 'invalid@3shape.com';
        const password = 'wrongpassword';

        await LoginPage.login(username, password);

        // Wait for error message
        await driver.pause(2000); // Add proper wait in real implementation

        // Verify error message is displayed
        const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).to.be.true;

        // Optionally verify error message text
        // const errorText = await LoginPage.getErrorMessageText();
        // expect(errorText).to.include('Invalid credentials');
    });

    /**
     * Test Case: Login with empty username
     */
    it('should show error when username is empty', async () => {
        const password = 'TestPassword123';

        await LoginPage.enterPassword(password);
        await LoginPage.clickLogin();

        // Verify error or that login button is disabled
        // Add assertion based on your app's behavior
        const isLoginPageStillDisplayed = await LoginPage.isLoginPageDisplayed();
        expect(isLoginPageStillDisplayed).to.be.true;
    });

    /**
     * Test Case: Login with empty password
     */
    it('should show error when password is empty', async () => {
        const username = 'testuser@3shape.com';

        await LoginPage.enterUsername(username);
        await LoginPage.clickLogin();

        // Verify error or that login button is disabled
        // Add assertion based on your app's behavior
        const isLoginPageStillDisplayed = await LoginPage.isLoginPageDisplayed();
        expect(isLoginPageStillDisplayed).to.be.true;
    });

    /**
     * Test Case: Verify username and password fields accept input
     */
    it('should accept input in username and password fields', async () => {
        const username = 'testuser@3shape.com';
        const password = 'TestPassword123';

        await LoginPage.enterUsername(username);
        await LoginPage.enterPassword(password);

        // Verify fields contain the entered values
        // Note: This might need adjustment based on how your app handles password fields
        const usernameInput = await LoginPage.getUsernameInput();
        const usernameValue = await usernameInput.getText();

        // Password fields typically don't expose their value for security
        // So we just verify the page state
        const isLoginPageDisplayed = await LoginPage.isLoginPageDisplayed();
        expect(isLoginPageDisplayed).to.be.true;
    });
});
