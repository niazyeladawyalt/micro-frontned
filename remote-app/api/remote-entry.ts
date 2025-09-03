// api/remote-entry.ts
export default function handler(req, res) {
  const allowedOrigins = ["https://micro-frontned-host.vercel.app"];
  const origin = req.headers.origin || "";

  // Preflight
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

  // Serve static remoteEntry.js
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile(process.cwd() + "/public/remoteEntry.js");
}
