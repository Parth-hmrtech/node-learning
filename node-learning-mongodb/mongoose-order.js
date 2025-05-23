const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: String,
    userId: Number, // match this with Users.id
    items: [String],
    totalAmount: Number,
    status: String,
    orderDate: Date
});
module.exports = mongoose.model('Orders', orderSchema);   