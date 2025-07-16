import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor ExpressJS funcionando correctamente");
});

// Ruta para obtener el precio desde Binance
app.get("/price", async (req, res) => {
  const symbol = req.query.symbol as string;

  if (!symbol) {
    return res.status(400).json({ error: "Símbolo no especificado" });
  }

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();

    if (!data || typeof data.price === "undefined") {
      return res.status(404).json({ error: "No se encontró el precio para el símbolo proporcionado", data });
    }

    res.status(200).json({ symbol: data.symbol, price: data.price });
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener el precio de Binance", detail: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
