const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "category",
      required: false,
    },
    subCategory: {
      type: ObjectId,
      ref: "subCategory",
      required: false,
    },
    brand: {
      type: ObjectId,
      ref: "brands",
      required: true,
    },
    groupTag: {
      type: ObjectId,
      ref: "GroupTag",
      required: false,
    },
    tags: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    addedBy: {
      type: ObjectId,
      ref: "Admin",
      required: false,
    },
    updatedBy: {
      type: ObjectId,
      ref: "Admin",
      required: false,
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variant",
        index: true,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    tastingNotes: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    suppressReservedKeysWarning: true,
    timestamps: true,
  }
);

productSchema.index(
  { productName: 1, category: 1, subCategory: 1, brand: 1, variants: 1 },
  { unique: true }
);

module.exports = mongoose.model("Product", productSchema, "products");
