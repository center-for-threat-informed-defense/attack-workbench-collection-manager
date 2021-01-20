'use strict';

const superagent = require('superagent');
const config = require('../config/config');

const errors = {
    missingParameter: 'Missing required parameter',
    badRequest: 'Bad request',
    invalidFormat: 'Invalid format',
    notFound: 'Not found',
    hostNotFound: 'Host not found',
    connectionRefused: 'Connection refused'
};
exports.errors = errors;

const workbenchUrl = config.workbench.restApiHost + ':' + config.workbench.restApiPort;

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
                const collectionIndex = res.body;
                return callback(null, collectionIndex);
            }
        });
}

exports.refresh = function(id, callback) {
    // Do nothing for now
    process.nextTick(() => {
        return callback(null, {})
    });
};

exports.retrieveFromWorkbench = function(callback) {
    const getCollectionIndexesUrl = workbenchUrl + '/api/collection-indexes';
    superagent
        .get(getCollectionIndexesUrl)
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
                const collectionIndexes = res.body;
                return callback(null, collectionIndexes);
            }
        });
}

exports.updateWorkbench = function(collectionIndex, callback) {
    const putCollectionIndexesUrl = workbenchUrl + '/api/collection-indexes/' + collectionIndex.collection_index.id;
    superagent
        .put(putCollectionIndexesUrl)
        .send(collectionIndex)
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
            } else {
                return callback(null);
            }
        });
}
