const productModel = require('../../models/ProductModel');

const productService = {
    add: async({title, introduction, detail, cover, editTime, author}) => {
        return productModel.create({
            title, introduction, detail, cover, editTime, author
        })
    },
    updateList:async({_id, title, introduction, detail, cover, editTime}) => {
        if(cover){
            return productModel.updateOne({_id}, {
                title, introduction, detail, cover, editTime
            })
        }else{
            return productModel.updateOne({_id}, {
                title, introduction, detail, editTime
            })
        }
    },
    getList: async({_id, author}) => {
        return _id ? productModel.find({_id,author}) : productModel.find({author}); 
    },
    delList: async({_id}) => {
        return productModel.deleteOne({_id});
    },
    // publish: async({_id, isPublish, editTime}) => {
    //     return productModel.updateOne({_id},{
    //         isPublish,
    //         editTime
    //     });
    // }
}

module.exports = productService;