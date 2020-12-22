'use strict';

module.exports = {
    server: {
        port: process.env.PORT || 3001
    },
    app: {
        name: 'federated-attack-collection-manager',
        env: process.env.NODE_ENV || 'development'
    }
};
