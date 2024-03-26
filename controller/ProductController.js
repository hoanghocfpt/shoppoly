const ProductServices = require('../services/ProductServices');

exports.getAll = async () => {
    const products = await ProductServices.getAll();
    return products;
}

exports.getOne = async (id) => {
    const product = await ProductServices.getOne(id);
    return product;
}

exports.getAllBySlugCategory = async (slug) => {
    const product = await ProductServices.getAllBySlugCategory(slug)
    return product
}
exports.getOneBySlug = async (slug) => {
    const product = await ProductServices.getOneBySlug(slug);
    return product;
}

exports.update = async (id, data, method) => {
    const product = await ProductServices.update(id, data, method);
    return product;
}

exports.create = async (data) => {
    const product = await ProductServices.create(data);
    return product;
}

exports.delete = async (id) => {
    const product = await ProductServices.delete(id);
    return product;
}
