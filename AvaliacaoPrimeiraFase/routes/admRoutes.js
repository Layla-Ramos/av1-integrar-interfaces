const express = require("express");
const router = express.Router();
const admController = require('../controllers/admController.js');

router.post("/registrar", admController.registrar);
router.post("/login", admController.login);


module.exports = router;
