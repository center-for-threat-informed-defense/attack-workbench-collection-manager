'use strict';

const convict = require('convict');

const authnMechanismValues = ['apikey', 'client-credentials'];
convict.addFormat(enumFormat('authn-mechanism', authnMechanismValues, true));

// Creates a new convict format for a list of enumerated values
function enumFormat(name, values, coerceLower) {
    return {
        name,
        validate: function (val) {
            if (!values.includes(val)) {
                throw new Error(`Invalid ${ name } value`);
            }
        },
        coerce: function (val) {
            if (coerceLower) {
                return val.toLowerCase();
            }
            else {
                return val;
            }
        }
    }
}

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
    logging: {
        logLevel: {
            doc: 'Level of logging messages to write to console (error, warn, http, info, verbose, debug)',
            default: 'info',
            env: 'LOG_LEVEL'
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
        },
        authn: {
            mechanism: {
                doc: 'Mechanism to use when authenticating with the Workbench REST API',
                format: 'authn-mechanism',
                default: 'apikey',
                env: 'WORKBENCH_AUTHN_MECHANISM'
            },
            oidcClientCredentials: {
                clientId: {
                    doc: 'OIDC ClientId for the collection manager service',
                    format: String,
                    default: 'collection-manager',
                    env: 'WORKBENCH_AUTHN_CLIENT_ID'
                },
                clientSecret: {
                    doc: 'OIDC Client Secret for the collection manager service',
                    format: String,
                    default: '',
                    env: 'WORKBENCH_AUTHN_CLIENT_SECRET'
                },
                tokenUrl: {
                    doc: 'OIDC Identity Provider URL for requesting a token',
                    format: String,
                    default: '',
                    env: 'WORKBENCH_AUTHN_TOKEN_URL'
                },
                scope: {
                    doc: 'OIDC scope for accessing the REST API service',
                    format: String,
                    default: '',
                    env: 'WORKBENCH_AUTHN_SCOPE'
                }
            },
            apikey: {
                serviceName: {
                    doc: 'Name to use when authenticating',
                    format: String,
                    default: 'collection-manager',
                    env: 'WORKBENCH_AUTHN_SERVICE_NAME'
                },
                apikey: {
                    doc: 'apikey of this service (shared secret)',
                    format: String,
                    default: '',
                    env: 'WORKBENCH_AUTHN_APIKEY'
                }
            }
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

