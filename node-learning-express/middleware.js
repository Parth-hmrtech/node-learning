// middleware.js

const ageMiddleware = (req, res, next) => {
    // Get age from query for GET requests
    const age = req.query.age || req.body.age;

    if (!age) {
        return res.status(400).json({ error: "Age is required" });
    }

    if (parseInt(age) < 18) {
        return res.status(403).json({ error: "Access denied: you must be 18 or older" });
    }

    next();
};

module.exports = ageMiddleware;
