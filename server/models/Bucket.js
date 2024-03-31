// models/Bucket.js
const mongoose = require('mongoose');

// Define Bucket schema
const bucketSchema = new mongoose.Schema({
  bucketName: String,
  region: String,
  date: { type: Date, default: Date.now },
  imageUrl: String, // Add a field for storing image URLs
});

// Create Bucket model
const Bucket = mongoose.model('Bucket', bucketSchema);

module.exports = Bucket;
