const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const addressSchema = new mongoose.Schema(
  {
    user_id: { type: ObjectId, required: true },
    addressFullName: { type: String, required: false },
    first_name: { type: String, reqired: false },
    last_name: { type: String, required: false },
    address: { type: String, required: false },
    addressPhoneNumber: { type: String, required: true },
    locality: { type: String, required: false },
    country: { type: String, required: false },
    addressPincode: { type: String, required: true },
    state: { type: String, required: false },
    city: { type: String, required: false },
    houseNo: { type: String, required: false },
    roadName: { type: String, required: false },
    select: { type: String, required: false },
    coordinates: {
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
      },
    },
    map_url: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: false,
    },
    approval_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "active",
    },
    approval_note: {
      type: String,
      default: "",
    },
    is_b2b: {
      type: Boolean,
      default: false,
    },
    approved_by: {
      type: ObjectId,
      ref: "User",
      required: false,
    },
    approved_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema, "addresses");
