const express = require('express')
const path = require('path');
const logger = require('./middleware/logger');
const ROUTER = require('./routes/appRoutes');
const API_ROUTES = require('./routes/apiRoutes');
const USER_ROUTER = require('./routes/usersRoutes');
const authenticate = require('./middleware/auth');

const app = express();
const PORT = 3000

app.use(logger)
app.use(express.json())
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", ROUTER)
app.use("/users", USER_ROUTER)

app.use(authenticate)

app.use("/api", API_ROUTES)

app.listen(PORT, () => console.log("server is listening on port: " + PORT));