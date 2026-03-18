const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true
    },
    role_id: {
      type: ObjectId,
      required: true,
      ref: "Role",
    },
    storeNumber: {
      type: String,
      required: false
    },
    storeManager: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    storeAddress: {
      type: String,
      required: true
    },
    storeImage: {
      type: String,
      required: false
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: false,
    },
    // zipCode:{
    //   type:String,
    //   required:true
    // },
    zipCode: {
      type: Array,
      default: [],
    },
    primary_zip_code: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    generic_store: {
      type: Boolean,
      required: false,
      default: false

    },
    // first_name: {
    //   type: String,
    //   required: false,
    // },
    // last_name: {
    //   type: String,
    //   required: false,
    // },
    email: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    // alternative_phone_number: {
    //   type: String,
    //   required: false,
    // },
    password: {
      type: String,
      required: false,
    },
    // image: {
    //   type: String,
    //   required: false,
    // },
    // storage_images: {
    //   type: [String],
    //   required: false,
    // },
    // store_name: {
    //   type: String,
    //   required: true,
    // },

    // city: {
    //   type: String,
    //   required: true,
    // },
    // zip_code: {
    //   type: String,
    //   required: true,
    // },
    // is_active: {
    //   type: Boolean,
    //   default: false,
    //   required: false,
    // },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: false,
      },
      coordinates: {
        type: [Number, Number], // [<longitude>, <latitude> ]
        required: false,
        // index: '2dsphere'
      },
    },
    deliveryOptions: {
      type: String,
      enum: ["deliver_now", "schedule_only", "both"],
      default: "both",
      required: false,
    }

    // average_store_rating: {
    //   type: Number,
    //   default: 0,
    //   required: false,
    // },
    // total_ratings: {
    //   type: Number,
    //   default: 0,
    //   required: false,
    // },

    // added_by: {
    //   type: ObjectId,
    //   ref: "Admin",
    //   required: false,
    // },
    // updated_by: {
    //   type: ObjectId,
    //   ref: "Admin",
    //   required: false,
    // },

    // status: {
    //   type: String,
    //   enum: ["active", "inactive"],
    //   default: "active",
    //   required: true,
    // },

    // sequence_no: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);
adminSchema.index({ location: "2dsphere" })

module.exports = mongoose.model("Store", adminSchema, "store");