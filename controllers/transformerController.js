const Transformer = require("../models/transformerModel");
const catchAsync = require("../utils/catchAsync");

exports.addTransformer = catchAsync(async (req, res, next) => {
  const countDocuments = await Transformer.countDocuments();
  let numberToString = countDocuments.toString();
  // If length of number string is less that 9 then add zeros
  // if (numberToString.length < 9) {
  //   for (let i = numberToString.length; i < 9; i++) {
  //     numberToString = "00" + numberToString;
  //   }
  //   // If length of number string is less than 99 then add a zero
  // } else if (numberToString.length < 99) {
  //   for (let i = numberToString.length; i < 99; i++) {
  //     numberToString = "00" + numberToString;
  //   }
  // }
  console.log(numberToString);
  const transformer = await Transformer.create({
    transformerId: `TRANS-${numberToString}`,
    hydrogen: req.body.hydrogen,
    oxygen: req.body.oxygen,
    nitrogen: req.body.nitrogen,
    methane: req.body.methane,
    CO: req.body.CO,
    CO2: req.body.CO2,
    ethylene: req.body.ethylene,
    ethane: req.body.ethane,
    DBDS: req.body.DBDS,
    powerFactor: req.body.powerFactor,
    acethylene: req.body.acethylene,
    interfacialV: req.body.interfacialV,
    dielectricRigidity: req.body.dielectricRigidity,
    waterContent: req.body.waterContent,
    healthIndex: req.body.healthIndex,
    lifeExpectation: req.body.lifeExpectation,
  });
  res.status(201).json({
    status: "success",
    data: {
      transformer,
    },
  });
});

exports.updateTransformer = catchAsync(async (req, res, next) => {
  console.log(numberToString);
  const transformer = await Transformer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      transformer,
    },
  });
});

exports.getAllTransformers = catchAsync(async (req, res, next) => {
  const transformers = await Transformer.find({}, { _id: false, __v: false });
  res.status(201).json({
    status: "success",
    data: {
      transformers,
    },
  });
});

exports.deleteTransformers = catchAsync(async (req, res, next) => {
  await Transformer.deleteMany();
  res.status(200).json({
    status: "Success",
  });
});

// Returns transformers with healthIndex less than 16%
exports.badTransformers = catchAsync(async (req, res, next) => {
  const transformers = await Transformer.find({ healthIndex: { $lte: 16 } });
  res.status(200).json({
    status: "Success",
    total: transformers.length,
    data: {
      transformers,
    },
  });
});
