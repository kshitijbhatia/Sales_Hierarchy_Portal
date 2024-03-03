const express = require('express');

const router = express.Router();
const { exportData } = require('../controllers/exportData');

router.get('/', exportData);

module.exports = router;