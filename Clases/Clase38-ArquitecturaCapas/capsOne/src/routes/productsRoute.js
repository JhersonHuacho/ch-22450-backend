const { Router } = require('express');
const { getDatosController, postDatosController } = require('../controllers/productsController');
const { userAll } = require('../services/productServices');
const router = Router();

router.get("/", getDatosController);
router.post("/", postDatosController);

module.exports = router;