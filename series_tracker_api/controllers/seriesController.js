const Series = require("../models/Series");

exports.getSeries = async (req, res) => {
  const series = await Series.find();
  res.json(series);
};

exports.createSeries = async (req, res) => {
  const series = new Series(req.body);
  const saved = await series.save();
  res.json(saved);
};

exports.updateSeries = async (req, res) => {
  const updated = await Series.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

exports.deleteSeries = async (req, res) => {
  await Series.findByIdAndDelete(req.params.id);
  res.json({ message: "Series deleted" });
};