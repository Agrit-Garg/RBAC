const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        // Hash the password before saving to the database
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({ username, password: hashPassword, role });
        await newUser.save();

        res.status(201).json({ message: `User registered successfully with username ${username}` });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong` }); 
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: `User not found` }); // If user does not exist
        }
        
        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: `Invalid Credentials` }); 
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token }); // Return the token on successful login

    } catch (error) {
        res.status(500).json({ message: `Something went wrong` }); 
    }
};

module.exports = {
    register,
    login,
};
