const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      index: true,
    },
    description: {
      type: String,
      required: false,
    },
    permissions: {
      type: [String],
      default: [],
    },
    is_system: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Role", roleSchema, "roles");
