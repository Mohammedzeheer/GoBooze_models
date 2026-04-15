const mongoose = require('mongoose');

const VisitLogSchema = new mongoose.Schema({
  userId:       { type: String, default: 'guest' },
  postal_code:  { type: String, default: 'unknown' },
  store_id:     { type: String, default: 'unknown' },
  suburb_name:  { type: String, default: 'unknown' },  // e.g. "Craigieburn"
  entry_page:   { type: String, default: '/' },         // first page of session
  exit_page:    { type: String, default: '/' },         // last page before leaving
  timestamp:    { type: Date, default: Date.now },
  date:         { type: String },
});

module.exports = mongoose.model('VisitLog', VisitLogSchema);



// const mongoose = require('mongoose');

// const VisitLogSchema = new mongoose.Schema({
//   userId:      { type: String, default: 'guest' },
//   postal_code: { type: String, default: 'unknown' },
//   store_id:    { type: String, default: 'unknown' },
//   page:        { type: String },
//   timestamp:   { type: Date, default: Date.now },
//   date:        { type: String },
// });

// module.exports = mongoose.model('VisitLog', VisitLogSchema);