const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const db = require('../models/dbConnection')
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const JWT_SECRET = "donfnsjndj";
const fetchUser = require("../middleware/fetchUser")
router.post("/createUser", [
    body('name').isLength({ min: 4 }).withMessage('Name must be at least 4 characters long'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    body('email').isEmail().withMessage('Invalid email address')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            name,
            email,
            password: hash,
            timestamp: Date.now()
        });
        const data = {
            id: newUser.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }
        const token = jwt.sign(data, JWT_SECRET);
        await newUser.save();
        const success=true;
        res.send({success,token});

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server error');
    }
});




router.post('/login', [
    body('email').isEmail().withMessage('Enter proper credentials'),
    body('password').exists().withMessage('Password cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).send("Login with correct credentials");
        }

        const pass_verify = await bcrypt.compare(password, existingUser.password);
        if (!pass_verify) {
            return res.status(401).send("Login with correct credentials");
        }

        const data = {
            id: existingUser.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };

        const token = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, token });

    } catch (error) {
        console.error('Error in login', error);
        res.status(500).send('Error in login');
    }
});


router.post('/getUser', fetchUser, async (req, res) => {
    const id = req.user;
    try {
        if (!id) {
            return res.status(400).send("User ID is missing");
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
