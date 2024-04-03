const CategoryServices = require('../services/CategoryServices');

exports.getAll = async () => {
    const categories = await CategoryServices.getAll();
    return categories;
}

exports.getCategories = async function(req, res, next) {
    try {
        const categories = await CategoryServices.getAll()
        res.json(categories);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getCategorySlug = async function(req, res) {
    try {
        const slug = req.params.slug;
        const category = await CategoryServices.getOneBySlug(slug);
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getCategoryId = async function(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const category = await CategoryServices.getOne(id);
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.postCategory = async function(req, res) {
    try {
        const category = await CategoryServices.create(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.putCategory = async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id, req.body);
        const category = await CategoryServices.update(id,req.body, 'PUT');
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.patchCategory = async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id, req.body);
        const category = await CategoryServices.update(id,req.body, 'PATCH');
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteCategory = async function(req, res) {
    try {
        const id = req.params.id;
        const category = await CategoryServices.delete(id);
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}
