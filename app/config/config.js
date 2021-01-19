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
        restApiHost: process.env.workbenchHost || 'http://localhost',
        restApiPort: process.env.workbenchPort || 3000
    }
};
