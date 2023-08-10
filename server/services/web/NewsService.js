const newsModel = require("../../models/NewsModel");

const newsService = {
  getList: async ({ _id }) => {
    return _id
      ? newsModel.find({ _id, isPublish: 2 })
      : newsModel.find({isPublish: 2 }).sort({editTime:-1});
  },
  getTopList: async ({ limit }) => {
    return newsModel.find({isPublish: 2 }).sort({editTime:-1}).limit(limit);
  },
};

module.exports = newsService;
