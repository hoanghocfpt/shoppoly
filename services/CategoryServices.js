const Category = require('../models/Category')

// getall categories
exports.getAll = async () => {
    const categories = await Category.find({})
    return categories
}

exports.getOne = async (id) => {
    const category = await Category.findOne({_id: id})
    return category
}

exports.getOneBySlug = async (slug) => {
    const category = await Category.findOne({slug})
    return category
}

exports.update = async (id, data, method) => {
    try {
        let result;
        if (method === 'PUT') {
            // Xử lý cho PUT: có thể yêu cầu dữ liệu đầy đủ
            result = await Category.replaceOne({ _id: id }, data);
        } else if (method === 'PATCH') {
            // Xử lý cho PATCH: chỉ cập nhật các trường được cung cấp
            result = await Category.updateOne({ _id: id }, { $set: data}  );
        }
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


exports.create = async (data) => {
    const category = await Category.create(data)
    return category
}

exports.delete = async (id) => {
    const category = await Category.deleteOne({_id: id})
    return category
}
