const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const seriesRoutes = require("./routes/seriesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Series Tracker a funcionar" });
});

app.use("/api/series", seriesRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB ligado com sucesso");

    app.listen(process.env.PORT, () => {
      console.log(`Servidor a correr em http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao ligar ao MongoDB:", error);
  });