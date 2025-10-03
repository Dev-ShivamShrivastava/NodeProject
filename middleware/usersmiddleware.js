const User = require("../models/users");
const jwt = require('jsonwebtoken');

function handleGetUserByIdMiddleware(req, res,next) {
    let auth = req.headers.authorization;
    console.log("Auth", auth)
    if (!auth) {
        return res.status(401).json({ msg: "Authorization token is missing" });
    }
    try {
        const token = jwt.verify(auth, process.env.jwt_secret_key);
        req.userId = token.userId; // attach to request object
        next(); // pass to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
    
}

module.exports = {
    handleGetUserByIdMiddleware
}