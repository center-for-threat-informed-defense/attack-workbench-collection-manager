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
            if (err.message === collectionIndexesService.errors.badRequest) {
                logger.error('Badly formatted URL: ' + req.query.url);
                return res.status(400).send('URL is badly formatted.');
            } else if (err.message === collectionIndexesService.errors.invalidFormat) {
                logger.error('Invalid format: data is not JSON formatted or the structure is invalid.');
                return res.status(400).send('Invalid JSON format.');
            } else if (err.message === collectionIndexesService.errors.notFound) {
                logger.error('URL not found: ' + req.query.url);
                return res.status(404).send('Not found.');
            } else {
                logger.error('Failed with error: ' + err);
                return res.status(500).send('Unable to retrieve collection index from URL. Server error.');
            }
        } else {
            logger.debug("Success: Retrieved collection index from URL.");
            return res.status(200).send(collectionIndex);
        }
    });
};