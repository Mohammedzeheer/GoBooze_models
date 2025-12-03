const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const pointsSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  pointsBalance: { type: Number, default: 0 },
  pointsHistory: [
    {
      type: {
        type: String,
        enum: ["earn", "redeem", "deduct"], 
        required: true
      },
      points: { type: Number, required: true },
      basePoints: { type: Number },
      boostRefs: [{
        campaignId: { type: ObjectId, ref: 'BoostCampaign' },
        name: String,
        campaignType: String,
        pointsAdded: Number
      }],
      orderId: { type: ObjectId },
      reason: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("LoyaltyPoints", pointsSchema);