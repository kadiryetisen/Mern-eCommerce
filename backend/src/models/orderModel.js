const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String },
        qty: { type: Number },
        image: { type: String },
        price: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    paymentInformations: {
      method: { type: String },
      taxPrice: { type: Number },
      isPaid: { type: Boolean },
      paidAt: { type: Date },
      isDelivered: { type: Boolean },
      deliveredAt: { type: Date },
      city: { type: String },
      district: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('orders', orderSchema);
