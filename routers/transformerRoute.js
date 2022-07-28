const express = require("express");
const router = express.Router();
const csvtojson = require("csvtojson");
const Transformer = require('../models/transformerModel')
const transformerController = require("../controllers/transformerController");

router.post("/addTransformer", transformerController.addTransformer);
router.get("/getAllTransformers", transformerController.getAllTransformers);

router.post("/addCsv", async (req, res) => {
  csvtojson()
    .fromFile("transformer_csv.csv")
    .then((csvData) => {
      console.log(csvData);
      Transformer.insertMany(csvData)
        .then(function () {
          console.log("Data inserted");
          res.status(201).json({
            status: "success",
            data: {
              csvData,
            },
          });
        })
        .catch((err) => {
          console.log("An Error", err);
        });
    });
});
module.exports = router;
