const express = require('express')

const router = express.Router()

const {sendAllData, addData, editData, deleteData, sendLogs} = require('../controllers/salesData')

router.get('/get', sendAllData)
router.post('/add', addData)
router.put('/edit', editData)
router.delete('/delete', deleteData)
router.get('/logs/get', sendLogs)

module.exports = router;