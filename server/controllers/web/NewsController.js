const newsService = require("../../services/web/NewsService");

const newsController = {
    getList: async(req, res) => {
        let result = await newsService.getList({_id: req.params.id});
        res.send({
            ActionType:'OK',
            data:result
        }) 
    },
    getTopList: async(req, res) => {
        // console.log(req.query)
        let result = await newsService.getTopList({limit: req.query.limit});
        res.send({
            ActionType:'OK',
            data:result
        }) 
    },
}

module.exports = newsController;