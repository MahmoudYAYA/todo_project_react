import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/todos", (req, res) => {
  const q = "INSERT INTO todos (title, priority, deadline) VALUES (?, ?, ?)";
  db.query(q, [req.body.title, req.body.priority, req.body.deadline], (err) => {
    if (err) return res.json(err);
    return res.json("La tache à été ajouter avec succès");
  });
});

app.listen(3001, () => {
  console.log("Backend tourne sur http://localhost:3001");
});
