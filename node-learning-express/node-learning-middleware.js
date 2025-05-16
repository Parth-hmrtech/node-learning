const express = require('express');
const app = express();
const ageMiddleware = require('./middleware.js');

app.use(express.json());

let item = [];

app.post('/login', (req, res) => {
    const users = req.body;
    if (!Array.isArray(users)) {
        return res.status(400).json({ error: 'Expected an array of users' });
    }
    const invalid = users.find(user => !user.name);
    if (invalid) {
        return res.status(400).json({ error: 'Each user must have a "name"' });
    }
    users.forEach(user => item.push(user.name));
    res.status(201).json({
        message: 'Users added successfully',
        added: users.map(user => user.name)
    });
});

app.get('/home', ageMiddleware, (req, res) => {
    res.json(item);
});

app.delete('/home/:name', (req, res) => {
    const nameToDelete = req.params.name; // Get the name from the URL parameter
    const index = item.indexOf(nameToDelete);

    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    item.splice(index, 1); // Remove the user from the array

    res.json({
        message: `${nameToDelete} deleted successfully`,
        updatedList: item
    });
});

app.listen(3010, () => {
    console.log('Server running at http://localhost:3010');
});
