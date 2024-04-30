const eventLogger = require("../eventLog")

const logger = (req, res, next) => {
    const msg = `${req.ip}\t${req.method}\t${req.path}\t${JSON.stringify(req.query)}`
    eventLogger(msg)
    next()
}

module.exports = logger