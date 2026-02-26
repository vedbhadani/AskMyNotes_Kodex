const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
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
    fileName: {
        type: String,
        required: true,
    },
    extractedText: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("File", fileSchema);
