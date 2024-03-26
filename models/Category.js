const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    slug: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    thumbnail: String,
    status: {type: String, default: 'public'},
    createdAt: {type: Date, default: Date.now},
});


module.exports = mongoose.model('categories', Category);