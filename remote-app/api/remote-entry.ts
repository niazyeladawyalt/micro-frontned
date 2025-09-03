import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const allowedOrigins = [
    "https://micro-frontned-host.vercel.app",
  ];

  const origin = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else {
    return res.status(403).send("Forbidden");
  }

  res.setHeader("Content-Type", "application/javascript");

  const filePath = path.join(process.cwd(), "dist/assets/remoteEntry.js");
  const file = fs.readFileSync(filePath, "utf-8");

  res.send(file);
}
