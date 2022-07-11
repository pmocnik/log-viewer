const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    timestamp: { type: Date, required: true, immutable: true },
    message: { type: String, required: true },
    severity_level: { type: String, required: true },
    source: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'project', required: true }
}, { timestamps: true });

LogSchema.index({ message: 'text' });

module.exports = mongoose.model("log", LogSchema);