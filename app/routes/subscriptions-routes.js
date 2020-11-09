'use strict';

const express = require('express');
const subscriptionsController = require('../controllers/subscriptions-controller');

const router = express.Router();

router.route('/subscriptions')
    .get(subscriptionsController.retrieveAll)

module.exports = router;
