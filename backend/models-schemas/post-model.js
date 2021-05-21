const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: Array,
    localization: String
});

module.exports = mongoose.model('Post', postSchema);