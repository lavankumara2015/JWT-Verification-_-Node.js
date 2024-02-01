const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secrectkey";
const app = express();
app.use(express.json());


app.listen(3201, () => {
    console.log("server running");
});

function verifyToken(req, res, next) {
    const headers = req.headers['authorization'];
    // console.log(headers);
    if (typeof headers !== 'undefined') {
        const bearer = headers.split(' ');
        // console.log(bearer);
        const token = bearer[1];
        // console.log(token);
        req.token = token;
        next();
    } else {
        res.send("Error Middleware verifyToken"); 
    }
}

app.post("/register", async (req, res) => {
    const { username, password, DOB } = req.body;

    if (!username || !password || !DOB) {
        return res.send("Fill all fields");
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

    // console.log(hashed);

        jwt.sign({ username, hashed, DOB }, secretKey, { expiresIn: "300s" }, (err, token) => {
            if (err) {
                return res.status(500).send("Error creating token");
            }
         
            fs.readFile("./local.json", (err, data) => {
                if (err) {
                    return res.status(500).send("Error reading data");
                }

                const users = JSON.parse(data);
                const userExists = users.some((user) => user.username === username);

                if (userExists) {
                    return res.send("Username already exists");
                }

                users.push({ username, password: hashed, DOB });

                fs.writeFile("./local.json", JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).send("Error updating data");
                    }
                    res.json({ token });
                });
            });
        });
    } catch (error) {

        res.status(500).send("Catch error");
    }
});

app.get("/access", verifyToken, (req, res) => {

    jwt.verify(req.token, secretKey, (err, userData) => {

        if (err) {
            res.send("Error profile accessed"); 
        } 
        else {
            res.json({
                message: "profile accessed",
                userData
            });
        }
    });
});
