import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const allowedOrigins = [
    "https://micro-frontned-host.vercel.app",
  ];

  const origin = req.headers.origin || "";
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden");
  }

  // adjust the path depending on where Vercel puts your dist
  const filePath = path.join(process.cwd(), "dist/assets/remoteEntry.js");
  const file = fs.readFileSync(filePath, "utf-8");

  res.setHeader("Content-Type", "application/javascript");
  res.send(file);
}
