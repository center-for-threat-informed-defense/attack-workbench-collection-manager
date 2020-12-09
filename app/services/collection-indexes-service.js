'use strict';
const https = require('https');
const logger = require('../lib/logger');
const errors = {
    missingParameter: 'Missing required parameter'
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

    const encodeURL = encodeURI(url);
    const request = https.request(url, (res) => { 
        let data = "";
        res.on('data', (d) => { 
            data = data + d.toString(); 
        }); 

        res.on('end', () => { 
            const body = JSON.parse(data);
            return callback(null, body);
        }); 
    }) 
      
    request.on('error', (error) => { 
        return callback(error);
    }); 
      
    request.end()
};