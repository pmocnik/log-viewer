const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    short_name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('project', ProjectSchema);