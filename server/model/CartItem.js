const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, default: 1 },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
