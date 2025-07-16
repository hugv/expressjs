import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

app.get("/price", async (req, res) => {
  const symbol = req.query.symbol as string;

  if (!symbol) {
    return res.status(400).json({ error: "Símbolo no especificado" });
  }

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();

    if (!data || typeof data.price === "undefined") {
      return res.status(404).json({ error: "No se encontró el precio", data });
    }

    res.json({ symbol: data.symbol, price: data.price });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos", detail: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
