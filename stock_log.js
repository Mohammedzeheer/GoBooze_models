const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const stockLogSchema = new mongoose.Schema(
  {
    stock_id: {
      type: ObjectId,
      ref: "stocks",
    },
    store_id: {
      type: ObjectId,
      ref: "Store",
      required: true,
    },
    product_id: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    category_id: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    sub_category_id: {
      type: ObjectId,
      ref: "SubCollection",
      required: true,
    },
    action: {
      type: String,
      enum: ["ADD", "UPDATE", "REMOVE"],
      required: true,
    },
    quantity_changed: {
      type: Number,
      required: true,
    },
    previous_quantity: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      default: "Stock Added",
    },
    performedId: {
      type: ObjectId,
      required: true,
    },
    performed_by:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("StockLog", stockLogSchema , 'stock_log');