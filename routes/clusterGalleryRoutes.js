import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/:cluster_id", (req, res) => {
  const { cluster_id } = req.params;
  db.query("SELECT * FROM cluster_gallery WHERE cluster_id = ?", [cluster_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;