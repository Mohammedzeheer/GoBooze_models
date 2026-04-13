const mongoose = require('mongoose');

const VisitLogSchema = new mongoose.Schema({
  userId:      { type: String, default: 'guest' },
  postal_code: { type: String },
  store_id:    { type: String },
  page:        { type: String },
  ip:          { type: String },
  userAgent:   { type: String },
  timestamp:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('VisitLog', VisitLogSchema);