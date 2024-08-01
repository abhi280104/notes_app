const jwt = require('jsonwebtoken');
const JWT_SECRET = "donfnsjndj";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        console.error('No token provided');
        return res.status(401).send('Access Denied: No Token Provided');
    }

    try {
        const verify = jwt.verify(token, JWT_SECRET);
        console.log('Token verified:', verify);  // Debugging: log the verified token
        req.user = verify.id;  // Ensure the ID is correctly extracted
        next();
    } catch (error) {
        console.error('Token verification failed:', error);  // Debugging: log the error
        return res.status(400).send('Invalid Token');
    }
};

module.exports = fetchUser;
