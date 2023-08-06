const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    introduction:String,
    detail:String,
    cover: String,
    editTime:Date,
    author:String
});

let productModel = mongoose.model('products', ProductSchema);

module.exports = productModel