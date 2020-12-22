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
    }
};
