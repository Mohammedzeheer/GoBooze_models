const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const contentManagementSchema = new mongoose.Schema(
    {
        device_type: {
            type: String,
            required: false,
            // enum: ["web", "mobile" , "both"],
        },
        banner_type: {
            type: String,
            required: false,
            enum: ["landing_page_banner", "festival_banner", "subscribe_banner", "none","category_search_banner"],
        },
        title: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        images: {
            type: Array,
            required: false,
        },
        link: {
            type: String,
            required: false,
        },
        links: {
            type: [String], 
            required: false,
            validate: {
                validator: function(links) {
                    if (!links || links.length === 0) return true;
                    return links.every(link => {
                        if (!link || link.trim() === '') return true; 
                        try {
                            new URL(link);
                            return true;
                        } catch {
                            return false;
                        }
                    });
                },
                message: 'All links must be valid URLs'
            }
        },
        theme_type: {
            type: String,
            required: false,
            enum: ["light", "dark"]
        },
        content: {
            type: String,
            required: false,
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
    },
    {
        suppressReservedKeysWarning: true,
        timestamps: true,
    }
);

module.exports = mongoose.model("ContentManagement", contentManagementSchema, "content_managements");