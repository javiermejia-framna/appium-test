exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.spec.js'
    ],
    exclude: [],

    // ============
    // Capabilities
    // ============
    maxInstances: 1,

    // This will be overridden by platform-specific configs
    capabilities: [],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // Services
    services: [],

    // Framework
    framework: 'mocha',
    reporters: ['spec'],

    // Mocha Options
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // =====
    // Hooks
    // =====
    /**
     * Gets executed once before all workers get launched.
     */
    onPrepare: function (config, capabilities) {
        console.log('Starting test execution...');
    },

    /**
     * Gets executed before a worker process is spawned.
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
        console.log(`Worker ${cid} started`);
    },

    /**
     * Gets executed before test execution begins.
     */
    before: function (capabilities, specs) {
        // Set implicit wait
        driver.setImplicitTimeout(5000);
    },

    /**
     * Gets executed after all tests are done.
     */
    after: function (result, capabilities, specs) {
        // Cleanup if needed
    },

    /**
     * Gets executed after all workers have shut down.
     */
    onComplete: function (exitCode, config, capabilities, results) {
        console.log('All tests completed!');
    }
};
