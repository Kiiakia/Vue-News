const mongoose = require('mongoose')

let NewsSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    catagory:Number, // 1 2 3
    cover: String,
    isPublish: {
        type: Number,  // 1 2
    },
    editTime:Date,
    author:String
});

let newsModel = mongoose.model('news', NewsSchema);

module.exports = newsModel