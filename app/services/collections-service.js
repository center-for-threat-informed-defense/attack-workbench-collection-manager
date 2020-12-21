'use strict';

const superagent = require('superagent');
const errors = {
    missingParameter: 'Missing required parameter',
    badRequest: 'Bad request',
    invalidFormat: 'Invalid format',
    notFound: 'Not found'
};
exports.errors = errors;

exports.retrieveAll = function(callback) {
    // Do nothing for now
    process.nextTick(callback(null, []));
};

exports.import = function(collectionData, callback) {
    // Do nothing for now
    process.nextTick(callback(null, null));
}

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
        if (err.response.notFound) {
            const error = new Error(errors.notFound);
            return callback(error);
        } else if (err.response.badRequest) {
            const error = new Error(errors.badRequest);
            return callback(error);
        } else {
            return callback(err)
        }
    });
};