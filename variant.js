const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const storePricingSchema = new Schema({
  storeId: {
    type: ObjectId,
    ref: "Store",
    required: true,
  },
  sellingPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  finalSellingPrice: { type: Number, required: true },
});

const variantsModel = new mongoose.Schema(
  {
    variantName: {
      type: String,
      required: true,
    },
    slug: {
    type: String,
    unique: true, 
    },
    variantCode: {
      type: String,
      required: false,
    },
    variantImage: {
      type: String,
      required: false,
    },
    sellingPrice: {
      type: Number,
      required: false,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    finalSellingPrice: {
      type: Number,
      required: false,
    },
    storePricing: [storePricingSchema],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    products: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    isTopSellingProduct: {
      type: Boolean,
      default: false,
      required: false,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
    label: {
      type: String,
      enum: ["hot", "bestseller", "new", "none"],
      default: "none",
    },
    vol: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    metaDescription: {
      type: String,
      required: false,
    },
    alcohol_percentage: {
      type: Number,
      required: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
    offers: [
      {
        quantity: {
          type: Number,
          required: false,
          default: 1,
        },
        offerPrice: {
          type: Number,
          required: false,
          default: 0,
        },
        offerType: {
          type: String,
          enum: ["percent", "dollar"],
          default: "dollar",
        },
        isActive: {
          type: Boolean,
          required: false,
          default: false,
        },
      },
    ],
    isOfferApplied: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    // suppressReservedKeysWarning: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("Variant", variantsModel, "variants");
