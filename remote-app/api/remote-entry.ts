// api/remote-entry.ts
import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const allowedOrigins = ["https://micro-frontned-host.vercel.app"];
  const origin = req.headers.origin || "";

  // Handle preflight
  if (req.method === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(200).end();
      return;
    } else {
      res.status(403).end();
      return;
    }
  }

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden");
  }

  // Absolute path to your built remoteEntry.js
  const filePath = path.join(process.cwd(), "public", "remoteEntry.js");

  if (!fs.existsSync(filePath)) {
    console.error("remoteEntry.js not found at", filePath);
    return res.status(500).send("remoteEntry.js not found");
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Content-Type", "application/javascript");
  res.status(200).send(fileContent);
}
