const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "You are not authorized to do that" });

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { id, phone } = decoded;

    req.userId = id;
    next();
};

module.exports = { verifyToken };