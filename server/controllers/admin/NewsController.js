const newsService = require("../../services/admin/NewsService");

const newsController = {
    add:async(req, res) => {
        const cover = req.file ? `/newsImg/${req.file.filename}` : '';
        const {title, content, catagory, isPublish, author} = req.body;
        await newsService.add({
            title, 
            content, 
            catagory:Number(catagory), 
            isPublish:Number(isPublish),
            cover,
            editTime:new Date(),
            author
        });
        res.send({
            ActionType:'OK'
        }) 
    },
    updateList: async(req, res) => {
        const cover = req.file ? `/newsImg/${req.file.filename}` : '';
        const {title, content, catagory, isPublish,_id} = req.body;
        await newsService.updateList({
            _id,
            title, 
            content, 
            catagory:Number(catagory), 
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        });
        res.send({
            ActionType:'OK'
        }) 
    },
    getList: async(req, res) => {
        // console.log(req.query);
        let result = await newsService.getList({_id: req.params.id, author:req.query.author});
        res.send({
            ActionType:'OK',
            data:result
        }) 
    },
    delList: async(req, res) => {
        await newsService.delList({_id:req.params.id});
        res.send({
            ActionType:'OK',
        }) 
    },
    publish: async(req, res) => {
        await newsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType:'OK',
        }) 
    }
}

module.exports = newsController;