const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: false,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    alternative_phone_number: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role_id: {
      type: ObjectId,
      required: true,
      ref: "Role",
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    sequence_no: {
      type: String,
      required: false,
    },
    is_super_admin: {
      type: Boolean,
      default: false,
    },
    is_seed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema, "admins");
