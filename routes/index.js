const express = require('express');
const AppController = require('../controllers/AppController');

const router = express.Router();
console.log(AppController);
console.log(typeof(AppController));

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
