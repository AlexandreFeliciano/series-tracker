const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        series_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Series",
            required: true
        },
        author: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            min: 0,
            max: 10
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);