const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    timestamp: { type: Date, required: true, immutable: true },
    message: { type: String, required: true },
    severity_level: { type: String, required: true },
    source: { type: String, required: true },
    project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

module.exports = mongoose.model("log", LogSchema);