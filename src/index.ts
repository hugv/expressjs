import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/price', async (req, res) => {
  const symbol = req.query.symbol as string;
  if (!symbol) return res.status(400).json({ error: "Símbolo no especificado" });

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();

    if (!data || typeof data.price === "undefined") {
      return res.status(404).json({ error: "No se encontró el precio", data });
    }

    res.json({ symbol: data.symbol, price: data.price });
  } catch (err: any) {
    res.status(500).json({ error: "Error en el servidor", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
