const Transformer = require("../models/transformerModel");
const catchAsync = require("../utils/catchAsync");

exports.addTransformer = catchAsync(async (req, res, next) => {
  const transformer = await Transformer.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      transformer,
    },
  });
});

exports.getAllTransformers = catchAsync(async (req, res, next) => {
  const transformers = await Transformer.find();
  res.status(201).json({
    status: "success",
    data: {
      transformers,
    },
  });
});

exports.deleteTransformers = catchAsync(async (req, res, next) => {
  const transformer = await Transformer.deleteMany();
  res.status(200).json({
    status: "Success",
  });
});

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
