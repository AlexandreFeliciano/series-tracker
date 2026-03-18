const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
    title: String,
    genre: String,
    platform: String,
    status: String,
    rating: Number,
    totalSeasons: Number,
    watchedSeasons: Number,
    review: String,
    cover: String
});

module.exports = mongoose.model("Series", seriesSchema);