const API_ROUTES = require("express").Router();

API_ROUTES.get("/hello", (req, res) => {
    res.send("Hello World");
});

module.exports = API_ROUTES;