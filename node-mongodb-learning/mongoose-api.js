const express = require('express');
require('./mongoose'); // MongoDB connection
const Users = require('./mongoose-schema'); // User schema/model
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Create user
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

// Get all users
app.get('/users', async (req, res) => {
    try {
        const data = await Users.find();
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ error: "Failed to fetch users" });
    }
});

// Delete user by custom 'id'
app.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await Users.findOneAndDelete({ id: userId });
        if (!result) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully", user: result });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ error: "Failed to delete user" });
    }
});

// Update user by custom 'id'
app.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const result = await Users.findOneAndUpdate({ id: userId }, updateData, { new: true });
        if (!result) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(result);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ error: "Failed to update user" });
    }
});

// GET: Join Users with Orders
app.get('/users-orders', async (req, res) => {
    //  const userId = req.params.id;
    // const updateData = req.body;

    try {
        const result = await Users.aggregate([
            {
                $addFields: {
                    // Ensure both 'id' and 'userId' are the same type (both should be numbers here)
                    userId: { $toInt: "$id" }  // Explicitly convert 'id' to an integer
                }
            },
            {
                $lookup: {
                    from: 'orders',             // The 'orders' collection in the MongoDB database
                    localField: 'userId',       // The new 'userId' field after the conversion
                    foreignField: 'userId',     // The 'suerId' field in the 'orders' collection
                    as: 'orders'                // The array name to store the matching orders
                }
            }
        ]);

        console.log(result);  // Log the result for debugging

        res.status(200).json({data: result});

    } catch (error) {
        console.error("Error fetching joined data:", error);
        res.status(500).send({ error: "Failed to fetch users with orders" });
    }
});


app.listen(3008, () => {
    console.log('Server running on port 3007');
});
