'use strict';

const express = require('express');
const collectionsController = require('../controllers/collections-controller');

const router = express.Router();

router.route('/collections')
    .get(collectionsController.retrieveAll)
    .post(collectionsController.importCollection)

module.exports = router;
