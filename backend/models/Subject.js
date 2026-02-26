const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectId: {
        type: String,
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: "📘",
    },
    color: {
        type: String,
        default: "s0",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

subjectSchema.index({ subjectId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema);
