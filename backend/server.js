const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const seriesRoutes = require("./routes/seriesRoutes");
const seriesAdvancedRoutes = require("./routes/seriesAdvanced");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Series Tracker a funcionar" });
});

app.use("/api/series", seriesRoutes);
app.use("/api/series", seriesAdvancedRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB ligado com sucesso");

    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao ligar ao MongoDB:", error);
  });