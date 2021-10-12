const express = require('express');
const { AppController } = require('../controllers/AppController');

const router = express.Router();
console.log(AppController.getStatus);
console.log(typeof(AppController.getStatus));

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
