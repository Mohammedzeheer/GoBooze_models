const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

// Helper function to generate a 7-digit unique ID
// function generateUniqueId() {
//   const timestampPart = Date.now().toString().slice(-5); // Last 5 digits of the timestamp
//   const randomPart = Math.floor(10 + Math.random() * 90); // 2-digit random number to ensure 7 digits total
//   return parseInt(timestampPart + randomPart.toString());
// }

const orderSchema = new mongoose.Schema(
  {
    sequence_number: {
      type: String,
      default: ""
      // required: true,
      // unique: true,
      // default: generateUniqueId
    },
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,

    },
    address_id: {
      type: ObjectId,
      ref: "Address",
      required: true,
    },
    transaction_id: {
      type: String,
      required: false,
    },
    transaction_status: {
      type: String,
      required: false,
      default: "pending"
    },
    order_status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "on-the-way",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
      required: true,
    },
    delivery_time: {
      type: String,
      required: false,
    },
    delayed_time: {
      type: String,
      required: false,
    },
    pickup_delay_time: {
      type: String,
      required: false,
    },
    delivered_on: {
      type: Date,
      required: false,
    },
    order_value: {
      type: Number,
      required: true,
    },
    tax: {},
    delivery_charges: {
      type: Number,
      required: false,
      default: 0,
    },
    discount_value: {
      type: Number,
      required: false,
      default: 0,
    },
    coupon: {
      type: ObjectId,
      ref: "Coupon",
      required: false,
    },
    isCouponUsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCouponApplied: {
      type: Boolean,
      required: false,
      default: false,
    },
    couponAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    payment_method: {
      type: ObjectId,
      ref: "PaymentMethod",
      required: false,
    },
    order_rating: {
      type: Number,
      required: false,
    },
    order_review: {
      type: String,
      required: false,
    },
    order_delivery_images: {
      type: Array,
      required: false,
    },
    gobooze_rating: {
      type: Number,
      required: false,
    },
    gobooze_review: {
      type: String,
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
    discard_from: {
      type: ObjectId,
      ref: "Store",
      required: false,
    },
    order_Variants: {
      type: [{ type: Object }],
      required: false,
    },
    cartIds: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    cancel_reason: {
      type: String,
      default: "",
      required: false,
    },
    deliveryImages: {
      type: [String],
      required: false,
    },
    loyaltyPointsUsed: {
      type: Number,
      default: 0,
      min: 0
    },
    loyaltyDiscount: {
      type: Number,
      default: 0,
      min: 0
    },
    isLoyaltyApplied: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

// orderSchema.pre('save', function(next) {
//   if (this.isNew && !this.sequence_number) {
//     this.sequence_number = generateUniqueId();
//   }
//   next();
// });

module.exports = mongoose.model("Order", orderSchema, "orders");
