const sql = require("./db.js");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

app.listen(3050, () => {
    console.log("server Running");
});

app.post("/", async (req, res) => {
    const { id, username, password, DOB, image } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const insert = "INSERT INTO register (id, username, password, DOB, image) VALUES (?, ?, ?, ?, ?)";
        sql.query(insert, [id, username, hashedPassword, DOB, image], (err, data) => {
            if (err) {
                res.status(400).json({ UserData: "Not inserted" });
            } else {
                res.status(200).json({ UseData: "Inserted user data successfully" });
            }
        })
    } catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }
});