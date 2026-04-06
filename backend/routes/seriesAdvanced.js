const express = require("express");
const router = express.Router();
const Series = require("../models/series");
const Review = require("../models/review");

// 1. PESQUISA POR REGEX - procurar séries por título ou género
router.get("/search", async (req, res) => {
    try {
        const { title, genre } = req.query;
        const filter = {};

        if (title) filter.title = { $regex: title, $options: "i" };
        if (genre) filter.genre = { $regex: genre, $options: "i" };

        const series = await Series.find(filter);
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: "Erro na pesquisa", error });
    }
});

// 2. PROJEÇÃO - devolver só título, rating e status
router.get("/summary", async (req, res) => {
    try {
        const series = await Series.find({}, { title: 1, rating: 1, status: 1, platform: 1, _id: 0 });
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar resumo", error });
    }
});

// 3. $LOOKUP - buscar séries com as suas reviews
router.get("/with-reviews", async (req, res) => {
    try {
        const series = await Series.aggregate([
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "series_id",
                    as: "reviews"
                }
            },
            {
                $project: {
                    title: 1,
                    rating: 1,
                    status: 1,
                    reviews: 1
                }
            }
        ]);
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: "Erro no lookup", error });
    }
});

// 4. ELEMENTOS EMBUTIDOS - adicionar episódio a uma série
router.post("/:id/episodes", async (req, res) => {
    try {
        const series = await Series.findByIdAndUpdate(
            req.params.id,
            { $push: { episodes: req.body } },
            { new: true }
        );
        if (!series) return res.status(404).json({ message: "Série não encontrada" });
        res.status(201).json(series);
    } catch (error) {
        res.status(400).json({ message: "Erro ao adicionar episódio", error });
    }
});

// 5. ELEMENTOS EMBUTIDOS - listar episódios de uma série
router.get("/:id/episodes", async (req, res) => {
    try {
        const series = await Series.findById(req.params.id, { episodes: 1, title: 1 });
        if (!series) return res.status(404).json({ message: "Série não encontrada" });
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar episódios", error });
    }
});

// 6. ELEMENTOS REFERENCIADOS - criar review para uma série
router.post("/:id/reviews", async (req, res) => {
    try {
        const series = await Series.findById(req.params.id);
        if (!series) return res.status(404).json({ message: "Série não encontrada" });

        const review = new Review({
            series_id: req.params.id,
            author: req.body.author,
            comment: req.body.comment,
            score: req.body.score
        });

        const saved = await review.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar review", error });
    }
});

// 7. ELEMENTOS REFERENCIADOS - listar reviews de uma série
router.get("/:id/reviews", async (req, res) => {
    try {
        const reviews = await Review.find({ series_id: req.params.id });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reviews", error });
    }
});

module.exports = router;