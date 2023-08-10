const productModel = require("../../models/ProductModel");

const productService = {
  getList: async ({ _id }) => {
    return _id
      ? productModel.find({ _id})
      : productModel.find({}).sort({editTime:-1});
  },
};

module.exports = productService;
