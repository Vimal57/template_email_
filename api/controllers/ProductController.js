
module.exports = {
    async create(req, res) {
        try {
            console.log("req.body.name :: ", req.body.name);
            let newProduct = await Product.create({
                name : req.body.name
            });
            res.json({
                msg : "success",
                newProduct : newProduct
            })

        } catch(err) {
            console.log("err in create product : ", err);
            res.json({
                err : err
            })
        }
        
    },

    async find(req, res) {
        try {
            let products = await Product.find({});

            res.json({
                products : products
            });

        } catch (err) {
            res.status(400).json({
                msg : 'Something went wrong!'
            });
        }
    },

}