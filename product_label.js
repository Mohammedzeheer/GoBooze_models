const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labelSchema = new mongoose.Schema(
  {
    labelName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    labelImage: {
      type: String,
      required: false,
    },
    labelBanner: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#ff0000",
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("labels", labelSchema);