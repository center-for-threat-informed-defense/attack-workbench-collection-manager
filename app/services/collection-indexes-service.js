'use strict';

const superagent = require('superagent');

const config = require('../config/config');
const authenticatedRequest = require('../lib/authenticated-request');

const errors = {
    missingParameter: 'Missing required parameter',
    badRequest: 'Bad request',
    invalidFormat: 'Invalid format',
    notFound: 'Not found',
    hostNotFound: 'Host not found',
    connectionRefused: 'Connection refused',
    unauthorized: 'Unauthorized',
};
exports.errors = errors;

/**
 * Retrieves a collection index from the provided URL.
 * This is expected to be a remote URL that does not require authentication.
 */
exports.retrieveByUrl = function(url, callback) {
    if (!url) {
        const error = new Error(errors.missingParameter);
        return callback(error);
    }

    superagent
        .get(url)
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                if (err.response && err.response.notFound) {
                    const error = new Error(errors.notFound);
                    return callback(error);
                } else if (err.response && err.response.badRequest) {
                    const error = new Error(errors.badRequest);
                    return callback(error);
                } else if (err.code === 'ENOTFOUND') {
                    const error = new Error(errors.hostNotFound);
                    return callback(error);
                } else if (err.code === 'ECONNREFUSED') {
                    const error = new Error(errors.connectionRefused);
                    return callback(error);
                } else {
                    return callback(err)
                }
            }
            else {
                try {
                    // Parsing res.text handles both the content-type text/plain and application/json use cases
                    const collectionIndex = JSON.parse(res.text);
                    return callback(null, collectionIndex);
                }
                catch (err) {
                    return callback(err);
                }
            }
        });
}

exports.refresh = function(id, callback) {
    // Do nothing for now
    process.nextTick(() => {
        return callback(null, {})
    });
};

/**
 * Retrieves a list of collection indexes from the Workbench data store.
 */
async function retrieveFromWorkbenchAsync() {
    try {
        const getCollectionIndexesUrl = config.workbench.restApiBaseUrl + '/api/collection-indexes';
        const res = await authenticatedRequest.get(getCollectionIndexesUrl);
        const collectionIndexes = res.body;

        return collectionIndexes;
    }
    catch(err) {
        if (err.status === 401) {
            throw new Error(errors.unauthorized);
        }
        else if (err.response && err.response.notFound) {
            throw new Error(errors.notFound);
        }
        else if (err.response && err.response.badRequest) {
            throw new Error(errors.badRequest);
        }
        else if (err.code === 'ENOTFOUND') {
            throw new Error(errors.hostNotFound);
        }
        else if (err.code === 'ECONNREFUSED') {
            throw new Error(errors.connectionRefused);
        }
        else {
            throw err;
        }
    }
}

/**
 * Updates a collection index in the Workbench data store.
 */
async function updateWorkbenchAsync(collectionIndex, callback) {
    try {
        const putCollectionIndexesUrl = config.workbench.restApiBaseUrl + '/api/collection-indexes/' + collectionIndex.collection_index.id;
        await authenticatedRequest
            .put(putCollectionIndexesUrl, collectionIndex);
    }
    catch(err) {
        if (err.status === 401) {
            throw new Error(errors.unauthorized);
        }
        else if (err.response && err.response.notFound) {
            throw new Error(errors.notFound);
        } else if (err.response && err.response.badRequest) {
            throw new Error(errors.badRequest);
        } else if (err.code === 'ENOTFOUND') {
            throw new Error(errors.hostNotFound);
        } else if (err.code === 'ECONNREFUSED') {
            throw new Error(errors.connectionRefused);
        } else {
            throw err;
        }
    }
}

exports.retrieveFromWorkbench = function(callback) {
    retrieveFromWorkbenchAsync()
        .then((collectionIndexes) => {
            return callback(null, collectionIndexes);
        })
        .catch((err) => {
            return callback(err);
        })
}

exports.updateWorkbench = function(collectionIndex, callback) {
    updateWorkbenchAsync(collectionIndex)
        .then(() => {
            return callback(null);
        })
        .catch((err) => {
            return callback(err);
        })
}
