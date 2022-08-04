const mongoose = require("mongoose");
const transformerSchema = new mongoose.Schema({
  transformerId: {
    type: String,
    unique: true
  },
  hydrogen: {
    type: Number,
    required: [true],
  },
  oxygen: {
    type: Number,
    required: [true],
  },
  nitrogen: {
    type: Number,
    required: [true],
  },
  methane: {
    type: Number,
    required: [true],
  },
  CO: {
    type: Number,
    required: [true],
  },
  CO2: {
    type: Number,
    required: [true],
  },
  ethylene: {
    type: Number,
    required: [true],
  },
  ethane: {
    type: Number,
    required: [true],
  },
  acethylene: {
    type: Number,
    required: [true],
  },
  DBDS: {
    type: Number,
    required: [true],
  },
  powerFactor: {
    type: Number,
    required: [true],
  },
  interfacialV: {
    type: Number,
    required: [true],
  },
  dielectricRigidity: {
    type: Number,
    required: [true],
  },
  waterContent: {
    type: Number,
    required: [true],
  },
  healthIndex: {
    type: Number,
    required: [true],
  },
  lifeExpectation: {
    type: Number,
    required: [true],
  },
});
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
transformerSchema.pre("save", async function (next) {
  // const countDocuments = await Transformer.countDocuments();
  // let numberToString = countDocuments.toString();
  console.log("Reached pre save");
  this.transformerId = `TRANS-${generate(3)}`;
  return next();
});
const Transformer = mongoose.model("Transformer", transformerSchema);
module.exports = Transformer;
