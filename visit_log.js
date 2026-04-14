const mongoose = require('mongoose');

const VisitLogSchema = new mongoose.Schema({
  userId:      { type: String, default: 'guest' },
  postal_code: { type: String, default: 'unknown' },
  store_id:    { type: String, default: 'unknown' },
  page:        { type: String },
  timestamp:   { type: Date, default: Date.now },
  date:        { type: String },
});

module.exports = mongoose.model('VisitLog', VisitLogSchema);