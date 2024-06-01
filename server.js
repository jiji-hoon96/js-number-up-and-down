import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "main.html"));
});

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "main.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "game.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
