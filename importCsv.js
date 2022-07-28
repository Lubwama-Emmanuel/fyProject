const csvtojson = require("csvtojson");
const Transformer = require("./models/transformerModel");

exports.parseCsv = async (req, res) => {
  csvtojson()
    .fromFile("transformer_csv.csv")
    .then((csvData) => {
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
};
