const mongoose = require('mongoose');


const rewardSettingsSchema = new mongoose.Schema({
  isEnabled: { type: Boolean, default: false },
  requiredOrders: { type: Number, default: 5, min: 1 },
  windowDays: { type: Number, default: 15, min: 1 },

  isRepeatable: { type: Boolean, default: true },

  giftProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  giftQuantity: { type: Number, default: 1, min: 1 },

  eligibleOrderStatuses: {
    type: [String],
    enum: ['pending', 'accepted', 'on-the-way', 'delivered', 'rejected', 'cancelled', 'returned'],
    default: ['delivered'],
  },
  requireCompletedPayment: { type: Boolean, default: true },

  title: { type: String, default: 'Bottle Stamps' },
  badgeText: { type: String, default: 'BOTTLE STAMPS' },
  description: {
    type: String,
    default: 'Place {requiredOrders} orders in {windowDays} days and get a free gift.',
  },
  termsAndConditions: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('RewardSettings', rewardSettingsSchema);