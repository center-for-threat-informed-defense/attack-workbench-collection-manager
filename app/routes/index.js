'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator');
const collectionsRoutes = require('./collections-routes');
const collectionIndexesRoutes = require('./collection-indexes-routes');
const errorHandler = require('../lib/error-handler');
const logger = require('../lib/logger');

const router = express.Router();

// Parse the request body
router.use('/api', bodyParser.json({ limit: '1mb' }));
router.use('/api', bodyParser.urlencoded({ limit: '1mb', extended: true }));

try {
    // Setup request validation
    const validator = OpenApiValidator.middleware({
        apiSpec: './app/api/definitions/api.yml',
        validateRequests: true,
        validateResponses: false
    });
    router.use(validator);
} catch (error) {
    logger.warn(`Unable to configure openapi validator: ${ error }`);
}

// Set up the routes
router.use('/api', collectionsRoutes);
router.use('/api', collectionIndexesRoutes);

// Handle errors that haven't otherwise been caught
router.use(errorHandler.bodyParser);
router.use(errorHandler.requestValidation);
router.use(errorHandler.catchAll);

module.exports = router;
