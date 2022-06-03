const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    Exp_date: { type: String, required: true }
});

module.exports = mongoose.model("submission", SubmissionSchema)