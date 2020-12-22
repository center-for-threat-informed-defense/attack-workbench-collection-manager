'use strict';

const collectionIndexesService = require('../services/collection-indexes-service');
const logger = require('../lib/logger');

exports.retrieveByUrl = function(req, res) {
    collectionIndexesService.retrieveByUrl(req.query.url, function(err, collectionIndex) {
        if (err) {
            if (err.message === collectionIndexesService.errors.badRequest) {
                logger.warn('Badly formatted URL: ' + req.query.url);
                return res.status(400).send('URL is badly formatted.');
            } else if (err.message === collectionIndexesService.errors.invalidFormat) {
                logger.warn('Invalid format: data is not JSON formatted or the structure is invalid.');
                return res.status(400).send('Invalid JSON format.');
            } else if (err.message === collectionIndexesService.errors.notFound) {
                logger.warn('URL not found: ' + req.query.url);
                return res.status(404).send('Not found.');
            } else if (err.message === collectionIndexesService.errors.hostNotFound) {
                logger.warn('Host not found');
                return res.status(400).send('Host not found');
            } else if (err.message === collectionIndexesService.errors.connectionRefused) {
                logger.warn('Connection refused');
                return res.status(400).send('Connection refused');
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

exports.refresh = function(req, res) {
    const id = req.params.id;

    if (!id) {
        logger.error('Refresh collection index failed with error: Missing id');
        return res.status(400).send('Unable to refresh collection index. Missing id.')
    }

    collectionIndexesService.refresh(id, function(err, collectionIndex) {
        if (err) {
            logger.error('Failed with error: ' + err);
            return res.status(500).send('Unable to refresh collection index. Server error.');
        }
        else {
            logger.debug("Success: Refreshed collection index");
            return res.status(200).send(collectionIndex);
        }
    });
};
