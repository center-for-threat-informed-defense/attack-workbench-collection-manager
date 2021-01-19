'use strict';

module.exports = {
    server: {
        port: process.env.PORT || 3001
    },
    app: {
        name: 'attack-workbench-collection-manager',
        env: process.env.NODE_ENV || 'development'
    },
    openApi: {
        specPath: './app/api/definitions/openapi.yml'
    },
    workbench: {
        restApiHost: process.env.WORKBENCH_HOST || 'http://localhost',
        restApiPort: process.env.WORKBENCH_PORT || 3000
    },
    scheduler: {
        // Interval in seconds
        checkWorkbenchInterval: process.env.CHECK_WORKBENCH_INTERVAL || 10
    }
};
