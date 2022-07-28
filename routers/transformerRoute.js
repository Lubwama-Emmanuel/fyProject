const express = require("express");
const router = express.Router();
const importCsv = require("../importCsv");
const transformerController = require("../controllers/transformerController");

router.post("/addTransformer", transformerController.addTransformer);
router.get("/getAllTransformers", transformerController.getAllTransformers);
router.get("/badTransformers", transformerController.badTransformers);
router.delete("/deleteTransformers", transformerController.deleteTransformers);

router.post("/addCsv", importCsv.parseCsv);
module.exports = router;
