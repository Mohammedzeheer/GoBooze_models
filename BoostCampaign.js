const mongoose = require('mongoose');
const boostCampaignSchema = new mongoose.Schema({
  // ========== BASIC INFO ==========
  name: {
    type: String,
    required: true,
    trim: true
    // Example: "Double Points on Asahi Cans"
    // Purpose: Campaign display name for admin
  },
  description: {
    type: String,
    trim: true
    // Example: "Earn 2x points on all Asahi products this weekend"
    // Purpose: Internal description for admin reference
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'ended'],
    default: 'draft',
    index: true
    // Purpose: Control campaign state
    // - draft: Not yet live, being configured
    // - active: Currently running
    // - paused: Temporarily stopped (can be reactivated)
    // - ended: Campaign finished (archived)
  },
  // ========== SCHEDULE ==========
  schedule: {
    // startDate: {
    //   type: Date,
    //   required: true
    // },
    // endDate: {
    //   type: Date,
    //   required: true
    // },
    // :white_check_mark: new
startDate: {
  type: String,   // "2025-11-20"
  required: true,
},
endDate: {
  type: String,   // "2025-11-22"
  required: true,
},
    timezone: {
      type: String,
      // default: 'UTC'
      // Purpose: Handle time zones correctly
      // Example: "Asia/Kolkata"
    },
    daysOfWeek: [Number],
    // Purpose: Limit to specific days (optional)
    // Example: [0, 6] = weekends only, [1,2,3,4,5] = weekdays only
    // Values: 0=Sunday, 1=Monday, 2=Tuesday... 6=Saturday
    // Leave empty [] for all days
    timeRestrictions: {
    enabled: { type: Boolean, default: false },
    startTime: String,  // "14:00" (2 PM)
    endTime: String,    // "16:00" (4 PM)
    // Purpose: Run campaign only during specific hours
    // Example: "18:00" to "20:00" for happy hour (6 PM - 8 PM)
  }
  },
  // ========== TARGET CONDITIONS ==========
  targetConditions: {
    // Target specific products
    products: {
      enabled: { type: Boolean, default: false },
      productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      // Purpose: Apply boost only on specific products
      // Example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
      // Leave empty to apply on all products
    },
    // Target specific categories
    categories: {
      enabled: { type: Boolean, default: false },
      categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
      // Purpose: Apply boost on entire categories
      // Example: ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
    },
    // Target specific sales channels
    channels: {
      enabled: { type: Boolean, default: false },
      channelList: [{ type: String, enum: ['website', 'app'] }],
      // Purpose: Apply boost only on specific channels
      // Example: ["app"] = only app users get boost
    },
    // Target customer tags (using your existing tag system)
    customerTags: {
      enabled: { type: Boolean, default: false },
      tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerTag' }],
      // Purpose: Apply boost to customers with specific tags
      // Example: ["68f9ff0809ba9a2671f05041"] (your spirit-lover tag ID)
      // References your CustomerTag model
      specificCustomers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      // Purpose: Target individual customers by ID
      // Example: ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"]
    },
    // Order value criteria (optional)
    orderCriteria: {
      enabled: { type: Boolean, default: false },
      minOrderValue: Number,
      // Purpose: Minimum order amount required
      // Example: 50 = order must be at least $50
      maxOrderValue: Number
      // Purpose: Maximum order amount (rarely used)
      // Example: 500 = boost only applies to orders under $500
    }
  },
  // ========== BOOST TYPE & VALUE ==========
  boostType: {
    type: String,
    enum: ['multiplier', 'fixed_extra', 'replace_base'],
    required: true
    // Purpose: How to calculate bonus points
    //
    // multiplier: Multiply base points (e.g., 2x, 3x)
    // fixed_extra: Add fixed points per order (e.g., +200 points)
    // replace_base: Replace calculation entirely (e.g., give 1000 points OR 10 per $)
  },
  boostValue: {
    multiplier: Number,
    // For boostType = 'multiplier'
    // Example: 2 = double points, 3 = triple points, 1.5 = 1.5x points
    fixedPoints: Number,
    // For boostType = 'fixed_extra'
    // Example: 200 = add 200 extra points per qualifying order
    replacementRate: Number
    // For boostType = 'replace_base'
    // Example: 10 = give 10 points per dollar instead of configured rate
  },
  // ========== CAPS & LIMITS ==========
  caps: {
    maxPointsPerOrder: Number,
    // Purpose: Cap boost points on a single order
    // Example: 500 = even if boost calculates 1000 points, limit to 500
    // Prevents abuse on very large orders
    maxPointsPerCustomer: Number,
    // Purpose: Total boost points a customer can earn
    // Example: 2000 = customer can earn max 2000 boost points
    resetPeriod: {
      type: String,
      enum: ['daily', 'weekly', 'campaign', 'none'],
      default: 'none'
      // Purpose: When to reset maxPointsPerCustomer counter
      // daily = resets every day at midnight
      // weekly = resets every Monday
      // campaign = total for entire campaign duration
      // none = no reset (one-time limit)
    },
    globalLimit: {
      enabled: { type: Boolean, default: false },
      maxTotalPoints: Number,
      // Purpose: Total points awarded across ALL customers
      // Example: 100000 = campaign auto-pauses after 100k points awarded
      // Prevents budget overrun
      currentPointsAwarded: { type: Number, default: 0 }
      // Purpose: Running counter (auto-incremented)
    },
    maxUsesPerCustomer: Number,
    // Purpose: How many times a customer can use this boost
    // Example: 3 = customer can only benefit 3 times
    maxTotalUses: Number,
    // Purpose: Total uses across all customers
    // Example: 1000 = first 1000 orders get boost, then campaign pauses
    currentTotalUses: { type: Number, default: 0 }
    // Purpose: Running counter (auto-incremented)
  },
  // ========== STACKING & PRIORITY ==========
  //
  // WHAT IS STACKING?
  // When multiple boost campaigns are active at the same time,
  // "stacking" determines if they can combine together or if only one applies.
  //
  // EXAMPLE SCENARIO:
  // Campaign A: "Weekend 2x Points" (multiplier: 2)
  // Campaign B: "App Users 1.5x Points" (multiplier: 1.5)
  // Base order: $100 = 100 base points
  //
  // If STACKING ALLOWED:
  //   - multiplicative: 100 × 2 × 1.5 = 300 points (campaigns multiply)
  //   - additive: 100 × (2 + 1.5 - 1) = 250 points (add multipliers, subtract base)
  //   - highest_only: 100 × 2 = 200 points (use best campaign only)
  //
  // If STACKING NOT ALLOWED:
  //   - Only highest priority campaign applies (e.g., Campaign A = 200 points)
  //
  stacking: {
    allowStacking: { type: Boolean, default: true },
    // Purpose: Can this campaign combine with other active campaigns?
    // true = can work together with other campaigns
    // false = if this campaign applies, ignore all other campaigns
    //
    // USE CASES:
    // - Set to TRUE for most campaigns (weekend boost, app boost, etc.)
    // - Set to FALSE for exclusive promotions (e.g., "Black Friday 5x - cannot combine")
    priority: { type: Number, default: 5, min: 1, max: 10 },
    // Purpose: Order of checking/applying campaigns (higher = checked first)
    //
    // WHY IT MATTERS:
    // - When allowStacking = false, highest priority campaign wins
    // - When checking caps/limits, higher priority campaigns are processed first
    //
    // EXAMPLE PRIORITIES:
    // 10 = Flash sales, urgent promotions
    // 8  = VIP/Premium customer campaigns
    // 5  = Regular promotions (weekend, category boosts)
    // 3  = Evergreen campaigns (app boost, channel boost)
    // 1  = Baseline campaigns
    stackingMode: {
      type: String,
      enum: ['multiplicative', 'additive', 'highest_only'],
      default: 'multiplicative'
      // Purpose: HOW multiple campaigns combine when stacking is allowed
      //
      // MULTIPLICATIVE (most generous):
      // - Multiply all multipliers together
      // - Example: 2x × 1.5x = 3x total
      // - Best for customer rewards
      //
      // ADDITIVE (moderate):
      // - Add multipliers together, subtract 1
      // - Example: 2x + 1.5x - 1 = 2.5x total
      // - More controlled rewards
      //
      // HIGHEST_ONLY (most conservative):
      // - Use only the best campaign
      // - Example: max(2x, 1.5x) = 2x
      // - Budget-friendly option
    }
  },
  // ========== ANALYTICS (AUTO-TRACKED) ==========
  analytics: {
    totalPointsAwarded: { type: Number, default: 0 },
    // Purpose: Total boost points given (not base points)
    totalOrders: { type: Number, default: 0 },
    // Purpose: How many orders used this boost
    uniqueCustomers: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // Purpose: List of unique customer IDs who used this boost
    revenue: { type: Number, default: 0 }
    // Purpose: Total order value from boosted orders
  },
  isDeleted:{
    type : Boolean,
    default :false
  },
  // ========== USAGE HISTORY (AUTO-TRACKED) ==========
  usageHistory: [{
    userId:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orderId: String,
    pointsAwarded: Number,  // Boost points only
    basePoints: Number,     // Original points
    orderValue: Number,
    channel: String,
    date: { type: Date, default: Date.now }
  }],
  // Purpose: Detailed log of every boost application
  // Used for: analytics, cap enforcement, debugging
  // ========== CUSTOMER DISPLAY ==========
  displayToCustomers: { type: Boolean, default: true },
  // Purpose: Show this campaign in customer-facing UI
  // false = admin-only, hidden from customers
  badgeText: String,
  // Purpose: Badge to show on products/cart
  // Example: "2X POINTS", "BONUS +200"
  // ========== METADATA ==========
  createdBy: String
  // Purpose: Admin user ID who created campaign
}, {
  timestamps: true // Auto-adds createdAt, updatedAt
});
// Indexes for better query performance
boostCampaignSchema.index({ status: 1, 'schedule.startDate': 1, 'schedule.endDate': 1 });
boostCampaignSchema.index({ 'stacking.priority': -1 });
module.exports = mongoose.model('BoostCampaign', boostCampaignSchema);