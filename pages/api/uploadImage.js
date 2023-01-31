const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tournamentId = req.body.tournamentId;
    const dir = path.join(__dirname, "public/images", tournamentId);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single("image");

app.post("/api/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({
      message: "Image Uploaded Successfully",
    });
  });
});

module.exports = app;
