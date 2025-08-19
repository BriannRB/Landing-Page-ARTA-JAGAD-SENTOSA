import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// DB Config
import { db } from "./db.js";

// Import routes (GET only)
import homeRoutes from "./routes/homeRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";
import aboutInfoRoutes from "./routes/aboutInfoRoutes.js";
import kontakRoutes from "./routes/kontakRoutes.js";
import simulasiRoutes from "./routes/simulasiRoutes.js";
import simulasiBankRoutes from "./routes/simulasiBankRoutes.js";
import simulasiAccordionRoutes from "./routes/simulasiAccordionRoutes.js";
import clusterRoutes from "./routes/clusterRoutes.js";
import clusterGalleryRoutes from "./routes/clusterGalleryRoutes.js";
import clusterSpesifikasiRoutes from "./routes/clusterSpesifikasiRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/about-info", aboutInfoRoutes);
app.use("/api/kontak", kontakRoutes);
app.use("/api/simulasi", simulasiRoutes);
app.use("/api/simulasi-bank", simulasiBankRoutes);
app.use("/api/simulasi-accordion", simulasiAccordionRoutes);
app.use("/api/cluster", clusterRoutes);
app.use("/api/cluster-gallery", clusterGalleryRoutes);
app.use("/api/cluster-spesifikasi", clusterSpesifikasiRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/send-email", emailRoutes);

// Serve static frontend (opsional)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Company Profile Read-Only Server running at http://localhost:${PORT}`);
});
