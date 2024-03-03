const express = require('express');
const { searchSalesData } = require('../controllers/salesSearch');

const router = express.Router()

router.post('/', searchSalesData)

module.exports = router;