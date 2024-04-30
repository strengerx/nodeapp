const express = require('express')
const path = require('path');
const logger = require('./middleware/logger');
const ROUTER = require('./routes/appRoutes');
const API_ROUTES = require('./routes/apiRoutes');

const app = express();
const PORT = 3000

app.use(logger)
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", ROUTER)
app.use("/api", API_ROUTES)


app.listen(PORT, () => console.log("server is listening on port: " + PORT));