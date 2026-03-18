const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      default: ""
    },
    platform: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["completed", "watching", "plan", "dropped"],
      default: "plan"
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    totalSeasons: {
      type: Number,
      min: 1,
      default: 1
    },
    watchedSeasons: {
      type: Number,
      min: 0,
      default: 0
    },
    review: {
      type: String,
      default: ""
    },
    cover: {
      type: String,
      default: "https://placehold.co/300x450/png?text=Series"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Series", seriesSchema);