const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const groupTagSchema = new mongoose.Schema(
  {
    group_tag_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },

    added_by: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    updated_by: {
      type: ObjectId,
      ref: "Admin",
      required: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    suppressReservedKeysWarning: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("GroupTag", groupTagSchema, "group_tags");