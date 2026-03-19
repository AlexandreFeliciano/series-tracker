const express = require("express");
const router = express.Router();
const Series = require("../models/series");

// GET todas as séries
router.get("/", async (req, res) => {
  try {
    const series = await Series.find().sort({ createdAt: -1 });
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar séries" });
  }
});

// GET uma série por id
router.get("/:id", async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);

    if (!series) {
      return res.status(404).json({ message: "Série não encontrada" });
    }

    res.json(series);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar série" });
  }
});

// POST criar série
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEBIDO NO POST:", req.body);

    const newSeries = new Series(req.body);
    const savedSeries = await newSeries.save();

    console.log("SÉRIE GUARDADA:", savedSeries);

    res.status(201).json(savedSeries);
  } catch (error) {
    console.error("ERRO NO POST /api/series:", error);
    res.status(400).json({
      message: "Erro ao criar série",
      error: error.message,
    });
  }
});

// PUT atualizar série
router.put("/:id", async (req, res) => {
  try {
    const updatedSeries = await Series.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSeries) {
      return res.status(404).json({ message: "Série não encontrada" });
    }

    res.json(updatedSeries);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar série", error });
  }
});

// DELETE apagar série
router.delete("/:id", async (req, res) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(req.params.id);

    if (!deletedSeries) {
      return res.status(404).json({ message: "Série não encontrada" });
    }

    res.json({ message: "Série apagada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar série" });
  }
});

module.exports = router;