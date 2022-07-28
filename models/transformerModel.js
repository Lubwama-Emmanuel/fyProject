const mongoose = require("mongoose");
const transformerSchema = new mongoose.Schema({
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
  DBMS: {
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

module.exports = mongoose.model("Transform", transformerSchema);
