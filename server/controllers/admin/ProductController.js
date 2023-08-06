const productService = require("../../services/admin/ProductService");

const productController = {
    add:async(req, res) => {
        const cover = req.file ? `/productImg/${req.file.filename}` : '';
        const {title, introduction, detail , author} = req.body;
        await productService.add({
            title, 
            introduction, 
            detail,
            cover,
            editTime:new Date(),
            author
        });
        res.send({
            ActionType:'OK'
        }) 
    },
    updateList: async(req, res) => {
        const cover = req.file ? `/productImg/${req.file.filename}` : '';
        const {title, introduction, detail, _id} = req.body;
        await productService.updateList({
            _id,
            title, 
            introduction, 
            detail,
            cover,
            editTime:new Date()
        });
        res.send({
            ActionType:'OK'
        }) 
    },
    getList: async(req, res) => {
        // console.log(req.query);
        let result = await productService.getList({_id: req.params.id, author:req.query.author});
        res.send({
            ActionType:'OK',
            data:result
        }) 
    },
    delList: async(req, res) => {
        await productService.delList({_id:req.params.id});
        res.send({
            ActionType:'OK',
        }) 
    },
    // publish: async(req, res) => {
    //     await productService.publish({
    //         ...req.body,
    //         editTime:new Date()
    //     })
    //     res.send({
    //         ActionType:'OK',
    //     }) 
    // }
}

module.exports = productController;