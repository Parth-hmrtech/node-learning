const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = 3003;
// Step 1: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node');
// Step 2: Define user schema
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    gender: String,
    contectno: String,
    status: String,
    image: String // This will hold Base64 encoded image
});
const User = mongoose.model('User', userSchema);
// Step 3: Read and convert image to Base64
const imagePath = 'download.png'; // 🔁 Replace with actual image path
const base64Image = fs.readFileSync(imagePath).toString('base64');
// Step 4: Update user with id = 2 to add the image
User.findOneAndUpdate(
    { id: 2 },                     // Filter by id
    { image: base64Image },        // Set the image field
    { new: true }                  // Return the updated document
).then(user => {
    console.log('Updated user with image:', user);
}).catch(err => {
    console.error('Error:', err);
});
app.get('/show/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).send('<h1>User not found</h1>');
        }

        const html = `
      <!DOCTYPE html>
      <html>    
      <head>
        <title>User Image</title>
      </head>
      <body>
        <h2>User ID: ${user.id}</h2>
        <p>Name: ${user.name}</p>
        <img src="data:image/png;base64,${user.image}" alt="User Image" style="max-width: 400px;" />
      </body>
      </html>
    `;
        res.send(html);
    } catch (error) {
        res.status(500).send('<h1>Server error</h1>');
    }
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
