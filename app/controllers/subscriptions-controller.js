'use strict';

const subscriptionsService = require('../services/subscriptions-service');
const logger = require('../lib/logger');

exports.retrieveAll = function(req, res) {
    subscriptionsService.retrieveAll(function(err, subscriptions) {
        if (err) {
            logger.error('Failed with error: ' + err);
            return res.status(500).send('Unable to get subscriptions. Server error.');
        }
        else {
            logger.debug("Success: Retrieved subscriptions");
            return res.status(200).send(subscriptions);
        }
    });
};
