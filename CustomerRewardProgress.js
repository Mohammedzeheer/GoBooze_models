const mongoose = require('mongoose');

const customerRewardProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  requiredOrders: { type: Number, required: true },
  windowDays: { type: Number, required: true },
  giftProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  giftQuantity: { type: Number, required: true },
  rewardStartDate: { type: Date, required: true },
  rewardEndDate: { type: Date, required: true },
  eligibleOrders: [{
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    orderDate: { type: Date, required: true },
  }],

  status: {
    type: String,
    enum: ['IN_PROGRESS', 'REWARD_UNLOCKED', 'REWARD_CLAIMED', 'EXPIRED'],
    default: 'IN_PROGRESS',
    index: true,
  },

  rewardUnlockedAt: Date,
  rewardClaimedAt: Date,

  claimOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
}, { timestamps: true });

customerRewardProgressSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('CustomerRewardProgress', customerRewardProgressSchema);