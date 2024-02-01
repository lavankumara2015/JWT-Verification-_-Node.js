const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const upload = multer({ storage: storage });

app.post("/", upload.single("file"), (req, res) => {
   res.send("local")
});

app.listen(3004, () => {
    console.log("Server is running");
});
