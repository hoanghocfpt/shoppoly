const ProductServices = require('../services/ProductServices');

exports.getAll = async () => {
    const products = await ProductServices.getAll();
    return products;
}
exports.getProducts = async function(req, res) {
    try {
        const products = await ProductServices.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getProductSlug = async function(req, res) {
    try {
        const slug = req.params.slug;
        const product = await ProductServices.getOneBySlug(slug);
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getProductId = async function(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const product = await ProductServices.getOne(id);
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getProductsByCategorySlug = async function(req, res) {
    try {
        const slug = req.params.slug;
        console.log(slug)
        const products = await ProductServices.getAllBySlugCategory(slug);
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.patchProduct = async function(req, res) {
    try {
        const id = req.params.id;
        console.log(id, req.body);
        const category = await ProductServices.update(id,req.body, 'PATCH');
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.postProduct = async function(req, res) {
    try {
        const product = await ProductServices.create(req.body)
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteProduct = async function(req,res){
    try {
        const id = req.params.id
        const product = await ProductServices.delete(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error)
    }
}
