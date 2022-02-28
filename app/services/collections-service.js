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

exports.retrieveByUrl = function(url, callback) {
    if (!url) {
        const error = new Error(errors.missingParameter);
        return callback(error);
    }

    superagent.get(url).then(res => {
        try {
            const body = JSON.parse(res.text);
            return callback(null, body);
        } catch (err) {
            const error = new Error(errors.invalidFormat);
            return callback(error);
        }
    }).catch(err => {
        if (err.response && err.response.notFound) {
            const error = new Error(errors.notFound);
            return callback(error);
        }
        else if (err.response && err.response.badRequest) {
            const error = new Error(errors.badRequest);
            return callback(error);
        }
        else if (err.code === 'ENOTFOUND') {
            const error = new Error(errors.hostNotFound);
            return callback(error);
        }
        else if (err.code === 'ECONNREFUSED') {
            const error = new Error(errors.connectionRefused);
            return callback(error);
        }
        else {
            return callback(err)
        }
    });
};

/**
 * Retrieves all versions of a collection from the Workbench data store.
 */
async function retrieveFromWorkbenchAsync(id) {
    try {
        // Retrieve the x-mitre-collection objects
        const getCollectionUrl = config.workbench.restApiBaseUrl + '/api/collections/' + id + '?versions=all';
        const res = await authenticatedRequest.get(getCollectionUrl);
        const collections = res.body;

        return collections;
    }
    catch(err) {
        if (err.status === 401) {
            throw new Error(errors.unauthorized);
        }
        else if (err.response && err.response.notFound) {
            // Return an empty array
            return [];
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
 * Imports a collection bundle into the Workbench data store.
 */
async function importIntoWorkbenchAsync(collectionBundle, callback) {
    try {
        const importCollectionBundleUrl = config.workbench.restApiBaseUrl + '/api/collection-bundles';
        const res = await authenticatedRequest
            .post(importCollectionBundleUrl, collectionBundle);
        const importedCollection = res.body;

        return importedCollection;
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

exports.retrieveFromWorkbench = function(id, callback) {
    retrieveFromWorkbenchAsync(id)
        .then((collections) => {
            return callback(null, collections);
        })
        .catch((err) => {
            return callback(err);
        })
}

exports.importIntoWorkbench = function(collectionBundle, callback) {
    importIntoWorkbenchAsync(collectionBundle)
        .then((importedCollection) => {
            return callback(null, importedCollection);
        })
        .catch((err) => {
            return callback(err);
        })
}
