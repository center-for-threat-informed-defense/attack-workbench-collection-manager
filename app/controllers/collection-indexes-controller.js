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
