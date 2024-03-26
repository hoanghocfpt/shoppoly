const CategoryServices = require('../services/CategoryServices');

exports.getAll = async () => {
    const categories = await CategoryServices.getAll();
    return categories;
}

exports.getOne = async (id) => {
    const category = await CategoryServices.getOne(id);
    return category;
}

exports.getOneBySlug = async (slug) => {
    const category = await CategoryServices.getOneBySlug(slug);
    return category;
}

exports.update = async (id, data, method) => {
    const category = await CategoryServices.update(id, data, method);
    return category;
}

exports.create = async (data) => {
    const category = await CategoryServices.create(data);
    return category;
}

exports.delete = async (id) => {
    const category = await CategoryServices.delete(id);
    return category;
}