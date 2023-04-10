const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET
const JWT_USERNAME = process.env.JWT_USERNAME
const JWT_PASSWORD = process.env.JWT_PASSWORD

// Login endpoint to create token
const login = (req, res) => {
    const { username, password} = req.body;

    if(username === JWT_USERNAME && password === JWT_PASSWORD) {
        return res.json({
            token: jsonwebtoken.sign({ user: 'admin'}, JWT_SECRET),
        });
    }

    return res.status(401).json({ message: "The username and password are invalid" });
};

// Authentication for POST, PUT and DELETE method
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jsonwebtoken.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token'});
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Authorizaton header is missing'});
    }
};

module.exports = { login, authorize}