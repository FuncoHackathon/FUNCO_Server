import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("hahaha"));

const handleListening = () =>
  console.log(`✅ Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
