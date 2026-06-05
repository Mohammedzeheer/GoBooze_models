const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const deliveryAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  is_primary: { type: Boolean, default: false },
});

const businessProfileSchema = new mongoose.Schema(
  {
    // ── Link to users collection ──────────────────────────────────────────
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ── Business details (from sign-up form) ─────────────────────────────
    legal_name: {
      type: String,
      required: true,
      trim: true,
    },
    abn: {
      type: String,
      required: true,
      trim: true,
    },
    abn_verified: {
      type: Boolean,
      default: false,
    },
    business_type: {
      type: String,
      enum: [
        "Bar",
        "Restaurant / café",
        "Bottle shop / retailer",
        "Club",
        "Hotel / accommodation",
        "Event / catering company",
        "Corporate office",
      ],
      required: true,
    },

    // ── Liquor licence ────────────────────────────────────────────────────
    licence_number: {
      type: String,
      required: true,
      trim: true,
    },
    licence_type: {
      type: String,
      enum: [
        "General (pub / hotel)",
        "On-premises",
        "Packaged liquor",
        "Club",
        "Producer / wholesale",
        "Limited / event",
      ],
      required: true,
    },
    licence_expiry: {
      type: Date,
      required: true,
    },
    licence_doc_url: {
      type: String,
      required: false,
      default: null,
    },

    // ── Primary contact ───────────────────────────────────────────────────
    contact_name: {
      type: String,
      required: true,
    },
    contact_role: {
      type: String,
      required: false,
    },
    contact_email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contact_phone: {
      type: String,
      required: true,
    },

    // ── Delivery addresses ────────────────────────────────────────────────
    delivery_addresses: {
      type: [deliveryAddressSchema],
      required: true,
      validate: {
        validator: (v) => v.length >= 1,
        message: "At least one delivery address is required.",
      },
    },

    // ── Account state ─────────────────────────────────────────────────────
    // pending  → submitted, awaiting admin review
    // approved → verified, full B2B access
    // rejected → needs edit + resubmit
    // suspended → was approved, now blocked (e.g. licence expired)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
      required: true,
    },
    rejection_reason: {
      type: String,
      default: null,
    },

    // ── Rep tracking (from ?ref= in the invite link) ──────────────────────
    rep_tag: {
      type: String,
      default: null,
    },

    // ── Optional info ─────────────────────────────────────────────────────
    monthly_volume: {
      type: String,
      enum: [
        "Prefer not to say",
        "Under $1,000",
        "$1,000 – $5,000",
        "$5,000 – $20,000",
        "Over $20,000",
      ],
      default: "Prefer not to say",
    },
    notes: {
      type: String,
      default: null,
    },

    // ── Admin tracking ────────────────────────────────────────────────────
    reviewed_by: {
      type: ObjectId,
      ref: "Admin",
      default: null,
    },
    reviewed_at: {
      type: Date,
      default: null,
    },

    // ── Licence expiry reminder tracking ─────────────────────────────────
    expiry_reminder_sent: {
      type: Boolean,
      default: false,
    },
    expiry_reminder_sent_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BusinessProfile",
  businessProfileSchema,
  "business_profiles"
);