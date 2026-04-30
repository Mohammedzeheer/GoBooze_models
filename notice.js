const mongoose = require("mongoose");
const { Schema } = mongoose;

const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },           // "This week's deal"
    description: { type: String, required: true, trim: true },     // "Get $5 OFF"
    code: { type: String, trim: true, default: "" },               // "GBZ5" (optional)
    validTill: { type: String, trim: true, default: "" },          // "Valid till Sunday" (free text)
    icon: { type: String, default: "🎉" },                          // emoji
    type: {
      type: String,
      enum: ["offer", "announcement", "warning", "info"],
      default: "offer",
    },
    showCode: { type: Boolean, default: true },                    // toggle copy button
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    added_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema, "notices");