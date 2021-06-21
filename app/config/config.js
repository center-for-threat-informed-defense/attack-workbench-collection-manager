'use strict';

const convict = require('convict');

const config = convict({
    server: {
        port: {
            doc: 'Port the HTTP server should listen on',
            format: 'int',
            default: 3001,
            env: 'PORT'
        },
        enableCorsAnyOrigin: {
            doc: 'Access-Control-Allow-Origin will be set to the wildcard (*), allowing requests from any domain to access the REST API endpoints',
            format: Boolean,
            default: true,
            env: 'ENABLE_CORS_ANY_ORIGIN'
        }
    },
    app: {
        name: {
            default: 'attack-workbench-collection-manager'
        },
        env: {
            default: 'development',
            env: 'NODE_ENV'
        }
    },
    workbench: {
        restApiBaseUrl: {
            doc: 'ATT&CK Workbench REST API base URL',
        //    default: 'http://localhost:3000',
            default: '',
            env: 'WORKBENCH_REST_API_BASE_URL'
        },
        restApiHost: {
            doc: 'ATT&CK Workbench REST API host (with protocol)',
            default: 'http://localhost',
            env: 'WORKBENCH_HOST'
        },
        restApiPort: {
            doc: 'ATT&CK Workbench REST API port',
            format: 'int',
            default: 3000,
            env: 'WORKBENCH_PORT'
        }
    },
    scheduler: {
        checkWorkbenchInterval: {
            doc: 'Sets the interval in seconds for starting the scheduler.',
            default: 10,
            env: 'CHECK_WORKBENCH_INTERVAL'
        }
    },
    openApi: {
        specPath: {
            default: './app/api/definitions/openapi.yml'
        }
    },
    configurationFiles: {
        jsonConfigFile: {
            doc: 'Location of a JSON file containing configuration values',
            default: '',
            env: 'JSON_CONFIG_PATH'
        }
    }
});

// Load configuration values from a JSON file if the JSON_CONFIG_PATH environment variable is set
if (config.get('configurationFiles.jsonConfigFile')) {
    config.loadFile(config.get('configurationFiles.jsonConfigFile'));
}

// The plan is to switch from providing the Workbench REST API host and port as two separate environment variables and
// instead provide just one environment variable with the entire base URL.
// This is a workaround to allow existing code that uses two environment variables to continue to operate while
// we transition to the new format.
if (process.env.WORKBENCH_REST_API_BASE_URL) {
    // If the environment variable is set, use it
    config.set('workbench.restApiBaseUrl', process.env.WORKBENCH_REST_API_BASE_URL);
}
else {
    // Otherwise, use the separate host and port values
    const baseUrl = config.get('workbench.restApiHost') + ':' + config.get('workbench.restApiPort');
    config.set('workbench.restApiBaseUrl', baseUrl);
}

config.validate({ allowed: 'strict' });

// Extract the configuration as an object to simplify access
module.exports = config.getProperties();

