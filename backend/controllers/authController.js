const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'modern_craigslist_jwt_secret', {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, loginId, password } = req.body; 

        if (!name || !loginId || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Determine if loginId is an email or phone number
        const isEmail = loginId.includes('@');
        const userQuery = isEmail ? { email: loginId } : { phoneNumber: loginId };

        // Check if user exists
        const userExists = await User.findOne(userQuery);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this identification' });
        }

        // Create user
        const userData = {
            name,
            password
        };
        
        if (isEmail) userData.email = loginId;
        else userData.phoneNumber = loginId;

        const user = await User.create(userData);

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { loginId, password } = req.body;

        if (!loginId || !password) {
            return res.status(400).json({ message: 'Please provide identification and password' });
        }

        const isEmail = loginId.includes('@');
        const userQuery = isEmail ? { email: loginId } : { phoneNumber: loginId };

        const user = await User.findOne(userQuery);

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isVerified: user.isVerified,
                rating: user.rating,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
