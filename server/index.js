import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "92.204.219.29",
    user: "admin",
    password: "#FlyjnV{a~J?",
    database: "fantasyDB",
});

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/players", (req, res) => {
    const q = "SELECT * FROM players";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/players", (req, res) => {
    const q = "INSERT INTO players(`name`, `status`, `power`, `speed`, `defence`, `total`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.status,
        req.body.power,
        req.body.speed,
        req.body.defence,
        req.body.total,

    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/players/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM players WHERE id = ? ";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/players/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE players SET `name`= ?, `status`= ?, `power`= ?, `speed`= ? , `defence`= ?, `total`= ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.status,
        req.body.power,
        req.body.speed,
        req.body.defence,
        req.body.total,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("Connected to backend.");
});