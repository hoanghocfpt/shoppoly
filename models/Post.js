const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {type:String , required: true},
    content: String,
});


module.exports = mongoose.model('posts', Post);