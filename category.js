const mongoose = require("mongoose");
const slugify = require("slugify");

const ObjectId = mongoose.Schema.Types.ObjectId;

const collectionSchema = new mongoose.Schema(
  {
    collection_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
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
    slug: {
      type: String,
      required: false,
      unique: true,
    },
    metaTitle: {
      type: String,
      required: false,
    },
    metaDescription: {
      type: String,
      required: false,
    },
  },
  {
    suppressReservedKeysWarning: true,
    timestamps: true,
  }
);

collectionSchema.pre("save", function (next) {
  if (this.isModified("collection_name") || !this.slug) {
    this.slug = slugify(this.collection_name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Category", collectionSchema, "categories");
