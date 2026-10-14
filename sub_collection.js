const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const subCollectionSchema = new mongoose.Schema(
  {
    collection_id: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    sub_collection_name: {
      type: String,
      required: true,
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
    popular: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
      required: false,
    },
    metaDescription: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    bannerWeb: {
      type: String,
      default: "",
    },
    bannerMobile: {
      type: String,
      default: "",
    },
  },
  {
    suppressReservedKeysWarning: true,
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SubCollection",
  subCollectionSchema,
  "sub_categories"
);
