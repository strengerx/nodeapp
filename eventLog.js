const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid")
const { format } = require("date-fns")

const LOG_DIR = path.join(__dirname, "logs")
const LOG_FILE = "app.log"

const eventLogger = (msg) => {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true })
    }
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`
    try {
        fs.appendFileSync(path.join(LOG_DIR, LOG_FILE), logItem)
    } catch (error) {
        console.log(error)
    }
}

module.exports = eventLogger