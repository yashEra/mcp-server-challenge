import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000; // separate from Next.js 3000

// Example MCP endpoint
app.get("/api/status", (req, res) => {
  res.json({ message: "MCP Server running 🚀" });
});

app.listen(PORT, () => {
  console.log(`MCP Server running on http://localhost:${PORT}`);
});
