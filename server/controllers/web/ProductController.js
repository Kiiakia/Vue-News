const productService = require("../../services/web/ProductService");

const productController = {
    getList: async(req, res) => {
        let result = await productService.getList({_id: req.params.id});
        res.send({
            ActionType:'OK',
            data:result
        }) 
    },
}

module.exports = productController;