'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');

router.get('/', controller.post); 
router.post('/', controller.post); 

module.exports = router;