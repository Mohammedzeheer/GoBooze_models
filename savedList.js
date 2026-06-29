const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const savedListSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["standing_order", "event_pack", "custom"],
      default: "custom",
    },
    auto_suggest_day: {
      type: String,
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", null],
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
    items: [
      {
        variant_id:  { type: ObjectId, ref: "Variant", required: true },
        variantName: { type: String },
        variantImage:{ type: String },
        quantity:    { type: Number, default: 1, min: 1 },
        price:       { type: Number, default: 0 },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedList", savedListSchema, "saved_lists");