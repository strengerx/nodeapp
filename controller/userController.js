const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
require("dotenv").config();


const usersDB = {
    users: require("../resource/users.json"),
    setUsers: function (user) {
        this.users = user;
    },
};

const register = async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.json({
            status: "error",
            message: "Please provide all required information.",
        });
    }

    const userExists = usersDB.users.some((person) => person.email === email);

    if (userExists) {
        return res
            .status(409)
            .json({
                status: "error",
                message: "A user with that email already exists.",
            });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: uuid(), name, password: hashedPassword, email };
    usersDB.setUsers([...usersDB.users, newUser]);

    fs.writeFile(
        path.join(__dirname, "..", "resource", "users.json"),
        JSON.stringify(usersDB.users),
        (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({
                        status: "error",
                        message: "An error occurred while saving the user.",
                    });
            }
            return res
                .status(201)
                .json({ status: "success", message: "user created successfully." });
        }
    );
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            status: "error",
            message: "Please provide all required information.",
        });
    }

    const user = usersDB.users.find((person) => person.email === email);

    if (!user) {
        return res
            .status(401)
            .json({ status: "error", message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res
            .status(401)
            .json({ status: "error", message: "Invalid credentials." });
    }

    const accessToken = jwt.sign(
        { id: user.id, userName: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
    )

    const refressToken = jwt.sign(
        { id: user.id, userName: user.name },
        process.env.REFERSS_TOKEN_SECRET,
        { expiresIn: "3600s" }
    )

    res.cookie("refreshToken", refressToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    })

    return res
        .status(200)
        .json({ accessToken });
};

const genarateAccessTokenFromRefressToken = (req, res) => {
    console.log(object);
}

module.exports = { register, login };
