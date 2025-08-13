const mongoose = require('mongoose');

const loyaltySettingsSchema = new mongoose.Schema({
    pointsPerDollar: { type: Number, default: 1 }, // $1 = X points
    redemptionRate: { type: Number, default: 1000 }, // X points = $5
    minRedemptionPoints: { type: Number, default: 500 }, // minimum points for redemption
    rewardValuePerRate: { type: Number, default: 5 } // value for redemptionRate points
}, { timestamps: true });

module.exports = mongoose.model('LoyaltySettings', loyaltySettingsSchema);
