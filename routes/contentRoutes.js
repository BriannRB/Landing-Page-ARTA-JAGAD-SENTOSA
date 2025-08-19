import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = (sql) => new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    const [home, about, developer, aboutInfo, kontak, simulasi, accordion, bank, clusters] = await Promise.all([
      query("SELECT * FROM home_sections"),
      query("SELECT * FROM about_sections"),
      query("SELECT * FROM developer_info"),
      query("SELECT * FROM about_info"),
      query("SELECT * FROM kontak_info"),
      query("SELECT * FROM simulasi_info"),
      query("SELECT * FROM simulasi_accordion"),
      query("SELECT * FROM simulasi_bank"),
      query("SELECT * FROM clusters")
    ]);

    res.json({ home, about, developer, aboutInfo, kontak, simulasi, accordion, bank, clusters });
  } catch (err) {
    res.status(500).json({ error: "Failed to load content" });
  }
});

export default router;