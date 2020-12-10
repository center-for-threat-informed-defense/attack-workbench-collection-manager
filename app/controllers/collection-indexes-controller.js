'use strict';

const collectionIndexesService = require('../services/collection-indexes-service');
const logger = require('../lib/logger');

exports.retrieveAll = function(req, res) {
    collectionIndexesService.retrieveAll(function(err, collectionIndexes) {
        if (err) {
            logger.error('Failed with error: ' + err);
            return res.status(500).send('Unable to get collection indexes. Server error.');
        }
        else {
            logger.debug("Success: Retrieved collection indexes");
            return res.status(200).send(collectionIndexes);
        }
    });
};

exports.retrieveByUrl = function(req, res) {
    collectionIndexesService.retrieveByUrl(req.query.url, function(err, collectionIndex) {
        if (err) {
            if (err.message === collectionIndexesService.errors.invalidURL) {
                logger.error('Badly formatted URL: ' + req.query.url);
                return res.status(400).send('URL is badly formatted.');
            } else {
                logger.error('Failed with error: ' + err);
                return res.status(500).send('Unabled to retrieve collection index from URL. Server error.');
            }
        } else {
            logger.debug("Success: Retrieved collection index from URL.");
            return res.status(200).send(collectionIndex);
        }
    })
};