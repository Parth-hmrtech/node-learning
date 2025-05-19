require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample in-memory user store (use a database for production)
let users = [];

// Secret key for JWT (keep this secret)
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Register API (POST)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user (in production, use a database)
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
});

// Login API (POST) to get JWT Token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
});

// Get User Info API (GET)
app.get('/user-info', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Token is required.' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        // Find the user based on decoded username
        const user = users.find(user => user.username === decoded.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Send back user info (for example: username, password, and token)
        res.json({ username: user.username, password: user.password, token });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
