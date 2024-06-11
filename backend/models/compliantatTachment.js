const mongoose = require("mongoose");

const attachmentSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports  = mongoose.model("compliantatTachment", attachmentSchema)