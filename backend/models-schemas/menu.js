const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    info: { type: String, required: true }
});

module.exports = mongoose.model('MenuModel', menuSchema);