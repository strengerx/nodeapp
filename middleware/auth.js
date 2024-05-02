const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized: Missing Authorization header' });
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized: Invalid Authorization scheme' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized: Token expired' });
            }
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;
