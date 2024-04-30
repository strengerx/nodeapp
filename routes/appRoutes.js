const express = require("express")
const path = require("path")

const ROUTER = express.Router()

ROUTER.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})

ROUTER.get("/about", (req, res) => {
    res.download(path.join(__dirname, "..", "views", "about.html"))
})

module.exports = ROUTER