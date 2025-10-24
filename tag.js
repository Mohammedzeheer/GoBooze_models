const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    display_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: [
        "preference", // wine-lover, beer-enthusiast, whiskey-fan
        "behavior", // frequent-buyer, bulk-buyer, premium-customer
        "demographic", // corporate, individual, party-planner
        "engagement", // newsletter-subscriber, app-user, loyalty-member
        "other"
      ],
      default: "other",
    },
    color: {
      type: String,
      required: false,
      default: "#6B7280", 
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    customer_count: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
tagSchema.index({ name: 1 });
tagSchema.index({ category: 1 });

module.exports = mongoose.model("Tag", tagSchema, "tags");