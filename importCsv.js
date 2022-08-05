const csvtojson = require("csvtojson");
const Transformer = require("./models/transformerModel");

function generate(n) {
  var add = 1,
    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}
exports.parseCsv = async (req, res) => {
  csvtojson()
    .fromFile("transformer_csv.csv")
    .then((csvData) => {
      csvData.forEach((el) => {
        el.transformerId = `TRANS-${generate(5)}`;
      });
      Transformer.create(csvData)
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
