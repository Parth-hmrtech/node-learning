const express = require('express');
require('./mongoose'); // connect to DB
const Users = require('./mongoose-schema'); // schema/model

const app = express();
app.use(express.json());

// POST: create user
app.post('/create', async (req, res) => {
    try {
        const data = new Users(req.body);
        const result = await data.save();
        console.log("Saved user:", result);
        res.status(201).send(result);
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(400).send({ error: "Failed to create user" });
    }
});

// GET: fetch all users
app.get('/users', async (req, res) => {
    try {
        const data = await Users.find(); // fetch all users
        console.log("Get users:");
        console.log(data); // logs to console
        res.status(200).send(data); // send list of users to client
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ error: "Failed to fetch users" });
    }
});

// DELETE: delete user by custom 'id'
app.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await Users.findOneAndDelete({ id: userId }); // use custom `id` field
        if (!result) {
            return res.status(404).send({ error: "User not found" });
        }
        console.log("Deleted user:", result);
        res.status(200).send({ message: "User deleted successfully", user: result });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ error: "Failed to delete user" });
    }
});

// UPDATE: update user by custom 'id'
app.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const result = await Users.findOneAndUpdate({ id: userId }, updateData, { new: true }); // use custom `id` field
        if (!result) {
            return res.status(404).send({ error: "User not found" });
        }
        console.log("Updated user:", result);
        res.status(200).send(result); // send updated user data
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ error: "Failed to update user" });
    }
});

app.listen(3006, () => {
    console.log('Server running on port 3006');
});
