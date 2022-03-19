const { Router } = require("express");
const { getDatosController, postDatosController } = require("../controllers/productsController");
const router = new Router();


router.get("/", getDatosController);
router.post("/", postDatosController);

module.exports = router;