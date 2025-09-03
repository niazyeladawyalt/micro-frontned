import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const allowedOrigins = [
    "https://micro-frontned-host.vercel.app"
  ];

  const origin = req.headers.origin || "";

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(200).end();
    } else {
      res.status(403).end();
    }
    return;
  }

  // Block unauthorized origins
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden");
  }

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Content-Type", "application/javascript");

  try {
    // Read the remoteEntry.js file from public folder
    const filePath = path.join(process.cwd(), "public/remoteEntry.js");
    const file = fs.readFileSync(filePath, "utf-8");
    res.send(file);
  } catch (err) {
    console.error("remoteEntry.js not found:", err);
    res.status(500).send("remoteEntry.js not found");
  }
}
