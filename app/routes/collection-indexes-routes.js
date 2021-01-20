'use strict';

const express = require('express');
const collectionIndexesController = require('../controllers/collection-indexes-controller');

const router = express.Router();

router.route('/collection-indexes/:id/refresh')
    .post(collectionIndexesController.refresh)

router.route('/collection-indexes/remote')
    .get(collectionIndexesController.retrieveByUrl)

module.exports = router;
