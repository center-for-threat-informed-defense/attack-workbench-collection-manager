'use strict';

const collectionsService = require('../services/collections-service');
const logger = require('../lib/logger');

exports.import = function(req, res) {
    const collectionImportData = req.body;

    collectionsService.import(collectionImportData, function(err) {
        if (err) {
            logger.error('Failed with error: ' + err);
            return res.status(500).send('Unable to import collection. Server error.');
        }
        else {
            logger.debug("Success: Imported collection");
            return res.status(200);
        }
    });
};

exports.retrieveByUrl = function(req, res) {
    collectionsService.retrieveByUrl(req.query.url, function(err, collection) {
        if (err) {
            if (err.message === collectionsService.errors.badRequest) {
                logger.error('Badly formatted URL: ' + req.query.url);
                return res.status(400).send('URL is badly formatted.');
            } else if (err.message === collectionsService.errors.invalidFormat) {
                logger.error('Invalid format: data is not JSON formatted or the structure is invalid.');
                return res.status(400).send('Invalid JSON format.');
            } else if (err.message === collectionsService.errors.notFound) {
                logger.error('URL not found: ' + req.query.url);
                return res.status(404).send('Not found.');
            } else if (err.message === collectionsService.errors.hostNotFound) {
                logger.warn('Host not found');
                return res.status(400).send('Host not found');
            } else if (err.message === collectionsService.errors.connectionRefused) {
                logger.warn('Connection refused');
                return res.status(400).send('Connection refused');
            } else {
                logger.error('Failed with error: ' + err);
                return res.status(500).send('Unable to retrieve collection from URL. Server error.');
            }
        } else {
            logger.debug("Success: Retrieved collection from URL.");
            return res.status(200).send(collection);
        }
    });
};
