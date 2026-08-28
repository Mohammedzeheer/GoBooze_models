const mongoose = require("mongoose");

// Captures "Notify me" submissions from customers whose postcode isn't
// covered yet, so admin can see demand and follow up when a zone opens.
const deliveryZoneRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    postcode: {
      type: String,
      required: true,
      trim: true,
    },
    suburb: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "notified"],
      default: "pending",
    },
  },
  { timestamps: true }
);

deliveryZoneRequestSchema.index({ postcode: 1, createdAt: -1 });

module.exports = mongoose.model(
  "DeliveryZoneRequest",
  deliveryZoneRequestSchema,
  "delivery_zone_requests"
);
