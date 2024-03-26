const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    purchased: { type: Number, default: 0 },
    image: [{ type: String }],
    price: { type: Number, required: true , default: 0},
    'price-old': { type: Number},
    category: { type: String, required: true, default: 'Chua phan loai' },
    'other-attributes': {
        origin: { type: String, required: true, default: 'Khong xac dinh'},
        brand: { type: String, required: true, default: 'Khong xac dinh'},
    }
});

module.exports = mongoose.model('products', Product);