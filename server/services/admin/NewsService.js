const newsModel = require('../../models/NewsModel');

const newsService = {
    add: async({title, content, catagory, isPublish, cover, editTime, author}) => {
        return newsModel.create({
            title, content, catagory, isPublish, cover, editTime, author
        })
    },
    updateList:async({_id,title, content, catagory, isPublish, cover, editTime}) => {
        if(cover){
            return newsModel.updateOne({_id}, {
                title, content, catagory, isPublish, cover, editTime
            })
        }else{
            return newsModel.updateOne({_id}, {
                title, content, catagory, isPublish, editTime
            })
        }
    },
    getList: async({_id, author}) => {
        return _id ? newsModel.find({_id,author}) : newsModel.find({author}); 
    },
    delList: async({_id}) => {
        return newsModel.deleteOne({_id});
    },
    publish: async({_id, isPublish, editTime}) => {
        return newsModel.updateOne({_id},{
            isPublish,
            editTime
        });
    }
}

module.exports = newsService;