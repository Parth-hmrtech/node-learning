const express = require('express');
const app = express();
const ageMiddleware = require('./middleware.js');

app.use(express.json());

let item = [];

app.post('/login', (req, res) => {
    const users = req.body;

    // Ensure that the body is an array
    if (!Array.isArray(users)) {
        return res.status(400).json({ error: 'Expected an array of users' });
    }

    // Validate that each object in the array has a 'name' property
    const invalid = users.find(user => !user.name);
    if (invalid) {
        return res.status(400).json({ error: 'Each user must have a "name"' });
    }

    // Push valid names into the item array
    users.forEach(user => item.push(user.name));

    // Respond back with a success message
    res.status(201).json({
        message: 'Users added successfully',
        added: users.map(user => user.name)
    });
});


// Apply age check to /home route
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
