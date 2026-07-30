const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    slug: {
        type: String,
        required: false,
    },
    metaTitle: {
        type: String,
        required: false,
    },
    metaDescription: {
        type: String,
        required: false,
    },
    description: {
      type: String,
      required: false,
    },
    brandImage: {
      type: String,
      required: false,
    },
    brandBanner: {
      type: String,
      default: "",
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("brands", brandSchema);
