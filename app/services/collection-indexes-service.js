'use strict';
const https = require('https');
const logger = require('../lib/logger');
const errors = {
    missingParameter: 'Missing required parameter',
    invalidURL: 'Badly formatted URL'
};
exports.errors = errors;

exports.retrieveAll = function(callback) {
    // Do nothing for now
    process.nextTick(callback(null, []));
};

exports.retrieveByUrl = function(url, callback) {
    if (!url) {
        const error = new Error(errors.missingParameter)
        return callback(error);
    }

    const request = https.request(url, (res) => { 
        let data = "";
        res.on('data', (chunk) => { 
            data += chunk.toString(); 
        }); 
        res.on('end', () => {
            try {
                const body = JSON.parse(data);
                return callback(null, body);
            } catch(error) {
                error = new Error(errors.invalidURL);
                return callback(error);
            }
        }); 
    }).on('error', (error) => { 
        return callback(error);
    }); 
      
    request.end()
};