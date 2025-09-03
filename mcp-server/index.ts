import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { SERVER_CONFIG } from "./config.ts";
import { cvChatHandler, emailHandler } from "./handlers.ts";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/status", (req, res) => {
  res.json({ message: "MCP Server running" });
});

// CV chat
app.post("/tool/cv-chat", async (req, res) => {
  try {
    const result = await cvChatHandler(req.body.arguments);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Send email
app.post("/tool/send-email", async (req, res) => {
  try {
    const result = await emailHandler(req.body.arguments);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(SERVER_CONFIG.port, () => {
  console.log(`${SERVER_CONFIG.name} running at http://localhost:${SERVER_CONFIG.port}`);
});
