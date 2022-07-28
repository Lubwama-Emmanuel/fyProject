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
  const transformers = await Transformer.findMany();
  res.status(201).json({
    status: "success",
    data: {
      transformers,
    },
  });
});
