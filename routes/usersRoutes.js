const { register, login } = require("../controller/userController")
const USER_ROUTER = require("express").Router()

USER_ROUTER.post("/add", register)
USER_ROUTER.post("/auth", login)

module.exports = USER_ROUTER