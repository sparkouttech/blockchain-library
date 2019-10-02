"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PeerSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true
  },
  connection_status: {
    type: Boolean,
    required: true
  },
  info: {
    type: Object,
    required: true
  }
}, {
  versionKey: false
});
module.exports = mongoose.model('Peer', PeerSchema);