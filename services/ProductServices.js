const Product = require('../models/Product')

// getall products
exports.getAll = async () => {
    const products = await Product.find({})
    return products
}

exports.getOne = async (id) => {
    const product = await
    Product.findOne({_id: id})
    return product
}

exports.getAllBySlugCategory = async (slug) => {
    const product = await Product.find({category: slug})
    return product
}
exports.getOneBySlug = async (slug) => {
    const product = await Product.findOne({slug})
    return product
}

exports.update = async (id, data, method) => {
    try {
        let result;
        if (method === 'PUT') {
            // Xử lý cho PUT: có thể yêu cầu dữ liệu đầy đủ
            result = await Product.replaceOne({ _id: id }, data);
        } else if (method === 'PATCH') {
            // Xử lý cho PATCH: chỉ cập nhật các trường được cung cấp
            result = await Product.updateOne({ _id: id }, { $set: data}  );
        }
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.create = async (data) => {
    const product = await Product.create(data)
    return product
}

exports.delete = async (id) => {
    const product = await Product.deleteOne({_id: id})
    return product
}
