'use strict';

const collectionsService = require('../services/collections-service');
const logger = require('../lib/logger');

exports.retrieveAll = function(req, res) {
    collectionsService.retrieveAll(function(err, collections) {
        if (err) {
            logger.error('Failed with error: ' + err);
            return res.status(500).send('Unable to get collections. Server error.');
        }
        else {
            logger.debug("Success: Retrieved collections");
            return res.status(200).send(collections);
        }
    });
};

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
